import userIcon from "../../../images/user.svg";
import * as styles from "./UserLogin.module.scss";
import {
  useAuthUserOrNull,
  useIsAuthenticated,
  useLoginWithRedirect,
  AdminPortal,
  ContextHolder
} from "@frontegg/react"
import {useState} from "react";

const UserLogin = () => {
    const loginWithRedirect = useLoginWithRedirect();
    const user = useAuthUserOrNull()
    const isAuthenticated = useIsAuthenticated()
    const [showUserMenu, setsShowUserMenu] = useState(false);

    const logout = () => {
      const baseUrl = ContextHolder.getContext().baseUrl;
      window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
    };

    const openAccountSettings = () => {
      AdminPortal.show()
    }

    const userLoginStyles = {
      width: '190px',
      border: 'solid',
      position: 'absolute',
      top: '70px',
      right: '66px',
      background: 'white',
    }

    const MenuDivider = () => <div style={{width: '100%', backgroundColor: 'black', height: '1px'}}/>

    return (
      <>
        {showUserMenu && <div style={...userLoginStyles}>
          {isAuthenticated ?
            <>
              <div style={{padding: '10px'}}>
                {`You are logged in as ${user?.name}`}
              </div>
              <MenuDivider/>
              <div onClick={logout} style={{padding: '10px'}}>
                {'Logout'}
              </div>
              <MenuDivider/>
              <div onClick={openAccountSettings} style={{padding: '10px'}}>
                <div style={{width: '100%', backgroundColor: 'black', height: '1px'}}/>
              </div>
            </>
            : <div onClick={loginWithRedirect} style={{padding: '10px'}}>
              {'login'}
            </div>
          }
        </div>}
        <a onClick={() => setsShowUserMenu((prev) => !prev)} className={styles.userLogin}>
          <img className={styles.image} src={userIcon} alt="Login"/>
        </a>
      </>
    );
  }
;

export default UserLogin;

