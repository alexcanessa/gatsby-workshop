import { CommerceLayer } from "@commercelayer/react-components/auth/CommerceLayer";
import { OrderContainer } from "@commercelayer/react-components/orders/OrderContainer";
import { OrderStorage } from "@commercelayer/react-components/orders/OrderStorage";
import { authentication } from "@commercelayer/js-auth";
import { useEffect, useState } from "react";
import { TBaseReturn } from "@commercelayer/js-auth/lib/esm/types";

type Props = {
  children: JSX.Element;
  clientId: string;
  slug: string;
  market: number;
};

type Authorization = TBaseReturn & {
  expires: number;
};

const getStoredAuthorization = (market: number): Authorization | null => {
  const authAsString = localStorage.getItem(`authorization-${market}`);

  if (authAsString != null) {
    return JSON.parse(authAsString);
  }

  return null;
};

const hasExpired = (time: number | undefined): boolean =>
  time === undefined || time < Date.now();

const isValid = (auth: Authorization | null): auth is Authorization =>
  auth != null ? !hasExpired(auth.expires) : false;

function CommerceLayerAuth({ children, clientId, slug, market }: Props) {
  const [authorization, setAuthorization] = useState<Authorization | null>(
    null
  );

  useEffect(() => {
    async function run() {
      const storedAuthorization = getStoredAuthorization(market);

      if (isValid(storedAuthorization)) {
        setAuthorization(storedAuthorization);
      } else {
        const result = await authentication("client_credentials", {
          clientId,
          slug,
          scope: `market:${market}`,
        });

        const auth: Authorization = {
          ...result,
          expires: Date.now() + result.expiresIn * 1000,
        };

        localStorage.setItem(`authorization-${market}`, JSON.stringify(auth));
        setAuthorization(auth);
      }
    }

    void run();
  }, [market]);

  if (authorization == null) {
    return null;
  }

  console.log(`order-${market}`);

  return (
    <CommerceLayer
      accessToken={authorization.accessToken}
      endpoint={`https://${slug}.commercelayer.io`}
    >
      <OrderStorage persistKey={`order-${market}`}>
        <OrderContainer>{children}</OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  );
}

export default CommerceLayerAuth;
