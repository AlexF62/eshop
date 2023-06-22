import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiMenuAltRight } from 'react-icons/bi';
import { signOut } from 'firebase/auth';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import auth from '../../firebase/config';
import {
    SET_ACTIVE_USER,
    REMOVE_ACTIVE_USER,
} from '../../redux/slice/authSlice';

const logo = (
    <div className={styles.logo}>
        <Link to='/'>
            <h2>
                e<span>Shop</span>.
            </h2>
        </Link>
    </div>
);

const cart = (
    <span className={styles.cart}>
        <Link to='/cart'>
            <p>0</p>
            Cart
            <FaShoppingCart size={20} />
        </Link>
    </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [displayName, setdisplayName] = useState('');
    const navigate = useNavigate();

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // const uid = user.uid;

    //             if (user.displayName == null) {
    //                 const ul = user.email.substring(0, user.email.indexOf('@'));
    //                 const uName = ul.charAt(0).toUpperCase() + ul.slice(1);
    //                 setdisplayName(uName);
    //             } else {
    //                 setdisplayName(user.displayName);
    //             }

    //             dispatch(
    //                 SET_ACTIVE_USER({
    //                     email: user.email,
    //                     userName: user.displayName
    //                         ? user.displayName
    //                         : displayName,
    //                     userID: user.uid,
    //                 })
    //             );
    //         } else {
    //             setdisplayName('');
    //             dispatch(REMOVE_ACTIVE_USER());
    //         }
    //     });
    // }, [dispatch, displayName]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                toast.success('Logout successfully.');
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <>
            <header>
                <div className={styles.header}>
                    {logo}
                    <nav
                        className={
                            showMenu
                                ? `${styles['show-nav']}`
                                : `${styles['hide-nav']}`
                        }
                    >
                        <div
                            className={
                                showMenu
                                    ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']} `
                                    : `${styles['nav-wrapper']}`
                            }
                            onClick={hideMenu}
                        ></div>

                        <ul onClick={hideMenu}>
                            <li className={styles['logo-mobile']}>
                                {logo}
                                <FaTimes size={22} onClick={hideMenu} />
                            </li>
                            <li>
                                <NavLink to='/' className={activeLink}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact' className={activeLink}>
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                        <div
                            className={styles['header-right']}
                            onClick={hideMenu}
                        >
                            <span className={styles.links}>
                                <showOnLogin>
                                    <NavLink to='/login' className={activeLink}>
                                        Login
                                    </NavLink>
                                </showOnLogin>
                                <showOnLogin>
                                    <a href='#home'>
                                        <BsFillPersonFill size={16} />
                                        Hi, {displayName}
                                    </a>
                                </showOnLogin>
                                <showOnLogin>
                                    <NavLink to='/order' className={activeLink}>
                                        My Orders
                                    </NavLink>
                                </showOnLogin>
                                <showOnLogin>
                                    <NavLink to='/' onClick={logoutUser}>
                                        Logout
                                    </NavLink>
                                </showOnLogin>
                            </span>
                            {cart}
                        </div>
                    </nav>
                    <div className={styles['menu-icon']}>
                        {cart}
                        <BiMenuAltRight size={28} onClick={toggleMenu} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
