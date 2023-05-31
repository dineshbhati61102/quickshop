import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GetCartAction } from '../Store/Actions/CartAction'
import { GetWishlistAction } from '../Store/Actions/WishlistAction'
import NavDropdown from 'react-bootstrap/NavDropdown';


const Navbar = () => {
    var dispatch = useDispatch()
    var allCarts = useSelector((state) => state.CartStateData)
    var allWishlists = useSelector((state) => state.WishlistStateData)
    const [Carts, setCarts] = useState([]);
    const [Wishlists, setWishlists] = useState([]);
    var navigate = useNavigate()
    const [SearchInput, setSearchInput] = useState("");


    async function handleInputChange(e) {
        setSearchInput(e.target.value);
        navigate(`/search-results?product=${e.target.value}`);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSearchInput("")
    };

    function userLogout() {
        localStorage.clear()
        navigate("/login")
    }

    function GetApiData() {
        if (localStorage.getItem("role") === "User") {
            dispatch(GetCartAction())
            if (allCarts.length) {
                setCarts(allCarts)
            }
            dispatch(GetWishlistAction())
            if (allWishlists.length) {
                setWishlists(allWishlists)
            }
        }
    }


    useEffect(() => {
        GetApiData()
    }, [dispatch, allCarts.length, allWishlists.length]);



    return (
        <>
            {/* <!-- Navbar Start --> */}

            <div className="container-fluid sticky-top mt-5 bg-light" >
                <div className="row align-items-center py-3 px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <Link to="/" className="text-decoration-none">
                            <h1 className="m-0 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-1 m-1">Quick</span>Shop</h1>
                        </Link>
                    </div>

                    <div className="col-lg-6 col-6 text-left">
                        <form onSubmit={handleFormSubmit}
                        >
                            <div className="input-group">
                                <input type="search" className="form-control" placeholder="Search products"
                                    name="search"
                                    value={SearchInput} onChange={handleInputChange}
                                />
                                <div className="input-group-append">
                                    <button type='submit' className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-3 col-6 text-right">

                        {localStorage.getItem("role") === "User" ?
                            <Link to="/wishlist" className="btn border">
                                <i className="fas fa-heart text-primary"></i>
                                <span className="badge text-primary">{`[${Wishlists.length}]`}</span>
                            </Link> : ""
                        }

                        {localStorage.getItem("role") === "User" ?
                            <Link to="/cart" className="btn border">
                                <i className="fas fa-shopping-cart text-primary"></i>
                                <span className="badge text-primary">{`[${Carts.length}]`}</span>
                            </Link> : ""
                        }

                    </div>
                </div>
                {/* <!-- Topbar End --> */}
                <div className="row border-top px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}>
                            <h6 className="m-0 text-light">Categories</h6>
                            <i className="fa fa-angle-down text-light"></i>
                        </a>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light" id="navbar-vertical" style={{ width: "calc(100% - 30px)", zIndex: "1" }}>
                            <div className="navbar-nav w-100 overflow-hidden" style={{ height: "410px" }}>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link" data-toggle="dropdown">Dresses <i className="fa fa-angle-down float-right mt-1"></i></a>
                                    <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                        <a href="" className="dropdown-item">Men's Dresses</a>
                                        <a href="" className="dropdown-item">Women's Dresses</a>
                                        <a href="" className="dropdown-item">Baby's Dresses</a>
                                    </div>
                                </div>
                                <a href="" className="nav-item nav-link">Shirts</a>
                                <a href="" className="nav-item nav-link">Jeans</a>
                                <a href="" className="nav-item nav-link">Swimwear</a>
                                <a href="" className="nav-item nav-link">Sleepwear</a>
                                <a href="" className="nav-item nav-link">Sportswear</a>
                                <a href="" className="nav-item nav-link">Jumpsuits</a>
                                <a href="" className="nav-item nav-link">Blazers</a>
                                <a href="" className="nav-item nav-link">Jackets</a>
                                <a href="" className="nav-item nav-link">Shoes</a>
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <Link to="/" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold "><span className="text-primary font-weight-bold border px-1 mr-1">Quick</span>Shop</h1>
                            </Link>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent">
                                <span>Menu</span> <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto py-0">
                                    <li class="nav-item"><Link to="/" className="nav-link" >Home</Link></li>
                                    <li class="nav-item"><Link to="/shop" className="nav-link">Shop</Link></li>
                                    <NavDropdown title="Pages" id="basic-nav-dropdown">
                                        <NavDropdown.Item>
                                            <Link to="/cart" className="dropdown-item p-0 ">Shopping Cart</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <Link to="/checkout" className="dropdown-item p-0 ">Checkout</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <li class="nav-item"><Link to="/contactus" className="nav-link">Contact</Link></li>
                                    <li class="nav-item"><Link to="/about" className="nav-link">About</Link></li>

                                </ul>

                                {localStorage.getItem("login") ?
                                    <NavDropdown title={localStorage.getItem("name")} id="basic-nav-dropdown">
                                        
                                            {localStorage.getItem("role") === "Admin" ?
                                                <>
                                                <NavDropdown.Item> 
                                                <Link to="/admin-home" className="dropdown-item py-0">Profile</Link>
                                                </NavDropdown.Item>
                                                    <NavDropdown.Item>
                                                        <a onClick={userLogout} className="dropdown-item py-0">Logout</a>
                                                    </NavDropdown.Item>
                                                </>

                                                : <>
                                                <NavDropdown.Item>
                                                <Link to="/profile" className="dropdown-item py-0">Profile</Link>
                                                </NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item>
                                                        <Link to="/cart" className="dropdown-item py-0">Cart</Link>
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item>
                                                        <a onClick={userLogout} className="dropdown-item py-0">Logout</a>
                                                    </NavDropdown.Item>
                                                </>

                                            }
                                         </NavDropdown>

                                    :
                                    <div className="navbar-nav ml-auto py-0">
                                        <Link to="/login" className="nav-link">Login</Link>
                                        <Link to="/signup" className="nav-link">Sign Up</Link>
                                    </div>
                                }


                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* <!-- Navbar End --> */}

        </>
    )
}

export default Navbar
