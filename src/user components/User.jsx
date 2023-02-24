import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../dashboard components/Dashboard.module.scss";
import { TbListSearch } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { RiDashboardFill } from "react-icons/ri";
import { MdSpeakerNotes } from "react-icons/md";
import { MdOutlineRecentActors } from "react-icons/md";
import { RiChatHistoryLine } from "react-icons/ri";
import { FcEmptyBattery } from "react-icons/fc";
import { RiChatHistoryFill } from "react-icons/ri";
import rack1 from "../assets/usernew.png";

import { BsFillPinAngleFill } from "react-icons/bs";
import { BsFillBookmarkStarFill } from "react-icons/bs";

import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { RiFileUserFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { BiUser } from "react-icons/bi";
import axios from "axios";
import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { useFormik } from "formik";

function Dashboard() {
  const navigate = useNavigate();
  const ref = useRef();

  const [pageLoading, setPageLoading] = useState(true);
  const [pageData, setPageData] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const [storeLoginby, setStoreLoginby] = useState([]);
  const [storeUsers, setStoreUsers] = useState([]);
  const removeLocalkey = () => {
    localStorage.removeItem("loadkey");
  };

  useEffect(() => {
    if (localStorage.ticket === undefined) {
      setPageData(true);
    } else if (localStorage.loadkey === "loading") {
      getDisplayCounts();

      getLoginBy();
      getUsers();

      setTimeout(() => setPageLoading(false), 6000);
      setTimeout(() => removeLocalkey(), 7000);
    } else if (localStorage.loadkey === undefined) {
      setPageLoading(false);
      getDisplayCounts();

      getLoginBy();
      getUsers();
    }
  }, []);
  const [storeCounts, setStoreCounts] = useState([]);

  const getDisplayCounts = async () => {
    try {
      const server = await axios.get(`${config.api}/display_counts`);

      setStoreCounts(server.data);
    } catch (error) {}
  };

  const getLoginBy = async () => {
    try {
      const server = await axios.get(
        `${config.api}/admin/login_by/${localStorage.getItem("ticket")}`
      );

      setStoreLoginby(server.data);
    } catch (error) {}
  };

  const getUsers = async () => {
    try {
      setUserLoading(true);
      const server = await axios.get(`${config.api}/view_users`);

      setStoreUsers(server.data);
      setUserLoading(false);
    } catch (error) {}
  };
  const getUsersNoLoading = async () => {
    try {
      const server = await axios.get(`${config.api}/view_users`);

      setStoreUsers(server.data);
    } catch (error) {}
  };
  const removeLocalstorgae = () => {
    localStorage.removeItem("ticket");

    navigate("/");
  };
  const openaddusers = () => {
    navigate("/addusers");
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [storeDeletingName, setStoreDeletingName] = useState([]);
  const [storeDeletingId, setStoreDeletingId] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(true);

  const opendelete = (name, _id) => {
    setOpenDelete(true);
    setStoreDeletingName(name);
    setStoreDeletingId(_id);
  };

  const deleteuser = async (_id) => {
    try {
      setDeleteLoading(false);

      const server = await axios.delete(`${config.api}/delete_user/${_id}`);
      if (server.data.message === "user deleted successfully") {
        toast.success("User deleted successfully", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setOpenDelete(false);
        setDeleteLoading(true);

        getUsersNoLoading();
      }
    } catch (error) {
      alert("error");
    }
  };

  const [openBooksList, setOpenBookList] = useState(false);
  const [storeListName, setStoreListName] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [storePersonId, setStorePersonId] = useState([]);
  const [checkid, setCheckid] = useState([]);

  const [currentOrPast, setCurrentOrPast] = useState(true);

  const [passUserId, setPassUserId] = useState([]);

  const openlist = (name, _id, person_id) => {
    setOpenBookList(true);
    currrentborrowed(_id);
    setListLoading(false);

    setPassUserId(_id);
    setStoreListName(name);
    setStorePersonId(person_id);
    getbooks();
  };
  const [openListEdit, setOpenListEdit] = useState(false);
  const [openListDelete, setOpenListDelete] = useState(false);
  const [listDeleteShowLoading, setListDeleteShowLoading] = useState(true);

  const [storeCurrentBorrowed, setStoreCurrentBorrowed] = useState([]);
  const [storePastBorrowed, setStorePastBorrowed] = useState([]);

  const currrentborrowed = async (_id) => {
    try {
      const server = await axios.get(
        `${config.api}/user/currently_borrowed/${_id}`
      );

      setStoreCurrentBorrowed(server.data);
      setListLoading(true);
    } catch (error) {}
  };
  const [storeBooks, setStoreBooks] = useState([]);

  const getbooks = async () => {
    try {
      const server = await axios.get(`${config.api}/view_books`);

      setStoreBooks(server.data);
      setEditButtonLoading(false);
    } catch (error) {}
  };
  const formik = useFormik({
    initialValues: {
      selected_book: "",
      return_date: "",
    },
    validate: (values) => {
      let error = {};

      const checkbook = storeBooks.some((get) => {
        return values.selected_book === get.book_name;
      });

      if (checkbook === false) {
        error.selected_book = "please enter correct book";
      }

      if (values.selected_book === "") {
        error.selected_book = "please enter name";
      }

      const currentdate = new Date();
      const returndate = new Date(values.return_date);
      if (returndate.getTime() && currentdate.getTime()) {
        const fnd = returndate.getTime() - currentdate.getTime();
        const days = Math.round(fnd / (24 * 60 * 60 * 1000));

        if (days < 0) {
          error.return_date = "select valid date";
        }
        if (days > 7) {
          error.return_date = "within 7 days only";
        }
      }

      if (values.return_date === "") {
        error.return_date = "please select return date";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);

        const server = await axios.put(
          `${config.api}/edit_register/${checkid}`,
          values
        );
        if (server.data.message === "registered successfully") {
          toast.success("Registered updated successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          currrentborrowed(passUserId);
          setTimeout(() => formik.resetForm(), 3000);
          setButtonLoading(false);
        }
        if (server.data.message === "user already borrowed three books") {
          toast.error("User already borrowed three books", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setButtonLoading(false);
        }
        if (
          server.data.message === `already user having ${values.selected_book}`
        ) {
          toast.error(server.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setButtonLoading(false);
        }
        if (server.data.message === "book not avaiable") {
          toast.error("Book not avaiable now", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setButtonLoading(false);
        }
        getbooks();
      } catch (error) {
        alert("error");
      }
    },
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const [editbuttonLoading, setEditButtonLoading] = useState(false);

  const getregister = async (_id) => {
    try {
      const server = await axios.get(`${config.api}/get_register/${_id}`);

      formik.setValues(server.data);
    } catch (error) {}
  };
  const deleteReg = async (_id) => {
    try {
      setListDeleteShowLoading(false);

      const server = await axios.delete(`${config.api}/delete_register/${_id}`);
      if (server.data.message === "register deleted successfully") {
        toast.success("Register deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        currrentborrowed(passUserId);
        setOpenListDelete(false);
        setListDeleteShowLoading(true);

        getUsersNoLoading();
      }
    } catch (error) {
      alert("error");
    }
  };

  const [tbleStatusLaoding, setTbleStatusLaoding] = useState(false);
  const [checkStatusLaoding, setCheckStatusLaoding] = useState([]);
  const changestatus = async (_id) => {
    try {
      setTbleStatusLaoding(true);

      const server = await axios.put(`${config.api}/book_returned/${_id}`);
      if (server.data.message === "book returned successfully") {
        toast.success("Book returned successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        currrentborrowed(passUserId);

        setTbleStatusLaoding(false);

        getUsersNoLoading();
      }
    } catch (error) {
      alert("error");
    }
  };

  const pastborrowed = async (_id) => {
    try {
      setListLoading(false);

      const server = await axios.get(
        `${config.api}/user/pastly_borrowed/${_id}`
      );

      setStorePastBorrowed(server.data);
      setListLoading(true);
    } catch (error) {}
  };
  const [forSearch, setForSearch] = useState("");

  return (
    <>
      {pageData ? (
        <>
          <div className={styles.page_bg}>
            <h1>please Login</h1>
          </div>
        </>
      ) : (
        <>
          {pageLoading ? (
            <>
              <div className="bookbg">
                <div class=" book">
                  <figure class="page"></figure>
                  <figure class="page"></figure>
                  <figure class="page"></figure>
                </div>

                <h1 className="loadingh1">Reading</h1>
              </div>
            </>
          ) : (
            <>
              <div className={styles.page_bg}>
                <div className={styles.nav_bar}>
                  <div className={styles.company_name}>
                    <p>
                      secert <b>Bookracks</b>
                    </p>
                  </div>
                  <div className={styles.others}>
                    <ul>
                      <li>
                        <li
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                        >
                          <RiDashboardFill />
                          Books
                        </li>
                      </li>
                      <li>
                        <HiUsers /> Users
                      </li>
                      <li
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        <MdSpeakerNotes /> Register
                      </li>

                      <li
                        onClick={() => {
                          navigate("/history");
                        }}
                      >
                        <RiChatHistoryFill />
                        History
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.login_person_admin}>
                  <div className={styles.details}>
                    <span>{storeLoginby.name}</span>
                  </div>

                  <div className={styles.logout} onClick={removeLocalstorgae}>
                    Logout
                  </div>
                </div>

                <div className={styles.dcparent}>
                  <div className={styles.displaycon}>
                    <div className={styles.dcbox}>
                      <div className={styles.dcbox_top}>
                        <h3>{storeCounts.userborrowed}</h3>
                      </div>
                      <div className={styles.dcbox_down}>
                        <span>
                          Borrowed <br /> Users
                        </span>
                        <span className={styles.dcbox_down_logo}>
                          <RiFileUserFill />
                        </span>
                      </div>
                    </div>
                    <div className={styles.dcbox}>
                      <div className={styles.dcbox_top}>
                        <h3>{storeCounts.totalbooksborrowed}</h3>
                      </div>
                      <div className={styles.dcbox_down}>
                        <span>
                          Borrowed <br /> Books
                        </span>
                        <span className={styles.dcbox_down_logo}>
                          <BsFillArrowUpRightCircleFill />
                        </span>
                      </div>
                    </div>
                    <div className={styles.dcbox}>
                      <div className={styles.dcbox_top}>
                        <h3>{storeCounts.duebooks}</h3>
                      </div>
                      <div className={styles.dcbox_down}>
                        <span>
                          Due <br /> Books
                        </span>
                        <span className={styles.dcbox_down_logo}>
                          <BsFillPinAngleFill />
                        </span>
                      </div>
                    </div>
                    <div className={styles.dcbox}>
                      <div className={styles.dcbox_top}>
                        <h3>{storeCounts.todayreturns}</h3>
                      </div>
                      <div className={styles.dcbox_down}>
                        <span>
                          Today <br /> Returns
                        </span>
                        <span className={styles.dcbox_down_logo}>
                          <BsFillBookmarkStarFill />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.displayimgrack}>
                    <img src={rack1} />
                  </div>
                </div>

                <div className={styles.bookdiv}>
                  <div className={styles.search_content}>
                    <h4 onClick={openaddusers}>
                      <FiUserPlus /> Add New User
                    </h4>
                    <div className={styles.search_bar}>
                      <div id="inputs">
                        <input
                          list="data"
                          placeholder="Type book name's to search"
                          name="text"
                          onChange={(e) => setForSearch(e.target.value)}
                          id="inputss"
                        />
                        <datalist id="data">
                          {storeUsers.map((get) => {
                            return (
                              <>
                                <option value={get.person_id}></option>
                              </>
                            );
                          })}
                        </datalist>
                        <span className="shows">
                          <TbListSearch /> Search
                        </span>
                      </div>
                    </div>

                    <div className={styles.bookcontainer}>
                      {userLoading ? (
                        <>
                          <div class="box">
                            <div class="bouncing-bar">
                              <div class="line line_two"></div>
                              <div class="line line_two"></div>
                              <div class="line line_two"></div>
                              <div class="line line_two"></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {storeUsers
                            .filter(
                              (p) =>
                                p.person_id.includes(forSearch) ||
                                p.user_name.includes(forSearch)
                            )
                            .map((get) => {
                              return (
                                <>
                                  <div className={styles.book_box}>
                                    <div className={styles.book_box_top}>
                                      <div
                                        className={
                                          styles.book_box_top_btn_left_two
                                        }
                                        onClick={() => {
                                          navigate(`/updateusers/${get._id}`);
                                        }}
                                      >
                                        <h2>
                                          <Link
                                            className={styles.link}
                                            to={`/updateusers/${get._id}`}
                                          >
                                            <CiEdit />
                                          </Link>
                                        </h2>
                                      </div>
                                      <div className={styles.book_box_img_two}>
                                        <img
                                          src={`https://avatars.dicebear.com/v2/avataaars/${get.user_name}.svg?options[mood][]=happy`}
                                        />
                                      </div>
                                      <div
                                        onClick={() =>
                                          opendelete(get.user_name, get._id)
                                        }
                                        className={
                                          styles.book_box_top_btn_right_two
                                        }
                                      >
                                        <h2>
                                          <AiOutlineDelete />
                                        </h2>
                                      </div>
                                    </div>
                                    <div className={styles.book_box_bottom}>
                                      <h5>
                                        <b>ID : </b>
                                        {get.person_id}
                                      </h5>

                                      <h5>
                                        <b>Name : </b>
                                        {get.user_name}
                                      </h5>
                                      <h5>
                                        <b>Email : </b>
                                        {get.email}
                                      </h5>
                                      <h5>
                                        <b>Mobile : </b>
                                        {get.mobile_no}
                                      </h5>

                                      <button
                                        onClick={() =>
                                          openlist(
                                            get.user_name,
                                            get._id,
                                            get.person_id
                                          )
                                        }
                                        className="forbuttonfullscreen"
                                      >
                                        Borrowed list
                                      </button>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.footer}>
                  <h5>Powered-by</h5>
                  <p>
                    secert <b>Bookracks</b>
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {openDelete ? (
        <>
          <div className={styles.delete_div}>
            <div
              className={styles.delete_bg}
              onClick={() => {
                setOpenDelete(false);
                setDeleteLoading(true);
              }}
            ></div>
            <div className={styles.content_box}>
              {deleteLoading ? (
                <>
                  <h2>
                    Are sure want delete<span> {storeDeletingName} </span> ?
                  </h2>
                  <div className={styles.content_box_btn}>
                    <button
                      className={`forbuttonfullscreen ${styles.red_btn}`}
                      onClick={() => {
                        setOpenDelete(false);
                      }}
                    >
                      No
                    </button>
                    <button
                      className={`forbuttonfullscreen ${styles.green_btn}`}
                      onClick={() => {
                        deleteuser(storeDeletingId);
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>
                    {" "}
                    deleting <span> {storeDeletingName} </span> ?
                  </h2>
                  <div className={styles.content_box_btn}>
                    <div class="box">
                      <div class="bouncing-bar">
                        <div class="line line_two"></div>
                        <div class="line line_two"></div>
                        <div class="line line_two"></div>
                        <div class="line line_two"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {openBooksList ? (
        <>
          <div className={styles.delete_div}>
            <div
              className={styles.delete_bg}
              onClick={() => {
                getUsersNoLoading();
                setOpenListEdit(false);
                setOpenListDelete(false);
                setListDeleteShowLoading(true);
                setOpenBookList(false);
                setCurrentOrPast(true);
              }}
            ></div>

            <div className={styles.content_box}>
              {currentOrPast ? (
                <>
                  <div className={styles.listdiv}>
                    <div className={styles.top}>
                      <h4>
                        {" "}
                        <MdOutlineRecentActors /> Current
                      </h4>
                    </div>
                    <div className={styles.rightcorner}>
                      <h4 className={styles.rightcorner_first}>
                        <BiUser /> {storeListName} &nbsp;
                        <span>({storePersonId})</span>
                      </h4>
                      <h4
                        className={styles.rightcorner_last}
                        onClick={() => {
                          pastborrowed(passUserId);
                          setCurrentOrPast(false);
                          setOpenListEdit(false);
                        }}
                      >
                        <RiChatHistoryLine /> Past
                      </h4>
                    </div>
                    {listLoading ? (
                      <>
                        <form>
                          <div className={styles.tblparent}>
                            <table>
                              <tr className={styles.trhead}>
                                <th className={styles.bname}>Book</th>
                                <th>Return</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Status</th>
                              </tr>
                              {storeCurrentBorrowed.map((get) => {
                                const currentdate = new Date();
                                const returndate = new Date(get.return_date);

                                const fnd =
                                  returndate.getTime() - currentdate.getTime();
                                const d = Math.round(
                                  fnd / (24 * 60 * 60 * 1000)
                                );
                                const days = d;

                                return (
                                  <>
                                    <tr className={styles.trdata}>
                                      <td>{get.selected_book}</td>
                                      <td>{get.return_date}</td>
                                      <td
                                        onClick={() => {
                                          setEditButtonLoading(true);
                                          setListDeleteShowLoading(true);

                                          setOpenListDelete(false);
                                          setOpenListEdit(true);
                                          getbooks();
                                          getregister(get._id);
                                          setCheckid(get._id);
                                        }}
                                      >
                                        {editbuttonLoading &&
                                        get._id === checkid ? (
                                          <>
                                            <div class="box">
                                              <div class="bouncing-bar">
                                                <div class="line line_three"></div>
                                                <div class="line line_three"></div>
                                                <div class="line line_three"></div>
                                                <div class="line line_three"></div>
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <CiEdit />
                                        )}
                                      </td>
                                      <td
                                        onClick={() => {
                                          setOpenListDelete(true);
                                          setOpenListEdit(false);
                                          setStoreDeletingName(
                                            get.selected_book
                                          );
                                          setCheckid(get._id);
                                        }}
                                      >
                                        <AiOutlineDelete />
                                      </td>

                                      <td className={styles.btntd}>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setCheckStatusLaoding(get._id);
                                            changestatus(get._id);
                                          }}
                                          className={`forbuttonfullscreenstatus ${
                                            days == 0 ? "today" : ""
                                          }
  ${days > 0 ? "noissue" : ""}
  ${days < 0 ? "due" : ""}`}
                                        >
                                          {tbleStatusLaoding &&
                                          get._id === checkStatusLaoding ? (
                                            <>
                                              <div class="box">
                                                <div class="bouncing-bar">
                                                  <div class="line line_three white"></div>
                                                  <div class="line line_three white"></div>
                                                  <div class="line line_three white"></div>
                                                  <div class="line line_three white"></div>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            "Returned"
                                          )}
                                        </button>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            </table>
                          </div>

                          {storeCurrentBorrowed.length === 0 ? (
                            <h4 className={styles.empty}>
                              <FcEmptyBattery />
                              Empty
                            </h4>
                          ) : (
                            ""
                          )}
                          {openListEdit ? (
                            <div className={styles.listeditdiv}>
                              <div className={styles.closecorner}>
                                <h6
                                  onClick={() => {
                                    setOpenListEdit(false);
                                  }}
                                >
                                  <IoMdClose />
                                  Close
                                </h6>
                              </div>
                              <div className={styles.buttondiv}>
                                <h4>Edit Register</h4>
                              </div>
                              <div className="input_group">
                                <input
                                  list="idbook"
                                  placeholder="select books"
                                  name="selected_book"
                                  value={formik.values.selected_book}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  id="input"
                                  className={`
							${
                formik.touched.selected_book && formik.errors.selected_book
                  ? "error-box"
                  : ""
              }
							${
                formik.touched.selected_book && !formik.errors.selected_book
                  ? "success-box"
                  : ""
              }
   
							`}
                                />
                                {formik.touched.selected_book &&
                                formik.errors.selected_book ? (
                                  <span className="err">
                                    {formik.errors.selected_book}{" "}
                                  </span>
                                ) : null}

                                <datalist id="idbook">
                                  {storeBooks.map((get) => {
                                    return (
                                      <>
                                        {get.quantity > 0 ? (
                                          <>
                                            <option
                                              value={get.book_name}
                                            ></option>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    );
                                  })}
                                </datalist>
                              </div>

                              <div className="input_group">
                                <input
                                  type="text"
                                  placeholder="select return date"
                                  ref={ref}
                                  onFocus={() => (ref.current.type = "date")}
                                  name="return_date"
                                  value={formik.values.return_date}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  id="inputnumtbl"
                                  className={`
							${formik.touched.return_date && formik.errors.return_date ? "error-box" : ""}
							${formik.touched.return_date && !formik.errors.return_date ? "success-box" : ""}
   
							`}
                                />
                                {formik.touched.return_date &&
                                formik.errors.return_date ? (
                                  <span className="err">
                                    {formik.errors.return_date}{" "}
                                  </span>
                                ) : null}
                              </div>

                              <div className={styles.buttondiv}>
                                <button
                                  onClick={formik.handleSubmit}
                                  type="submit"
                                  className="forbuttonfullscreen"
                                >
                                  {buttonLoading ? (
                                    <>
                                      <div class="box">
                                        <div class="bouncing-bar">
                                          <div class="line"></div>
                                          <div class="line"></div>
                                          <div class="line"></div>
                                          <div class="line"></div>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    "Update"
                                  )}
                                </button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {openListDelete ? (
                            <>
                              {listDeleteShowLoading ? (
                                <>
                                  <div className={styles.listeditdiv}>
                                    <div className={styles.closecorner}>
                                      <h6
                                        onClick={() => {
                                          setOpenListDelete(false);
                                        }}
                                      >
                                        <IoMdClose />
                                        Close
                                      </h6>
                                    </div>
                                    <div className={styles.centerdeletetwo}>
                                      <h2>
                                        Are sure want delete
                                        <span> {storeDeletingName} </span> ?
                                      </h2>
                                      <div className={styles.content_box_btn}>
                                        <button
                                          className={`forbuttonfullscreen ${styles.red_btn}`}
                                          onClick={() => {
                                            setOpenListDelete(false);
                                          }}
                                        >
                                          No
                                        </button>
                                        <button
                                          className={`forbuttonfullscreen ${styles.green_btn}`}
                                          onClick={() => {
                                            deleteReg(checkid);
                                          }}
                                        >
                                          Yes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className={styles.centerdeletetwo}>
                                    <h2>
                                      {" "}
                                      deleting{" "}
                                      <span> {storeDeletingName} </span> ?
                                    </h2>
                                    <div className={styles.content_box_btn}>
                                      <div class="box">
                                        <div class="bouncing-bar">
                                          <div class="line line_two"></div>
                                          <div class="line line_two"></div>
                                          <div class="line line_two"></div>
                                          <div class="line line_two"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </form>
                      </>
                    ) : (
                      <>
                        <div class="box">
                          <div class="bouncing-bar">
                            <div class="line line_two"></div>
                            <div class="line line_two"></div>
                            <div class="line line_two"></div>
                            <div class="line line_two"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.listdiv}>
                    <div className={styles.top}>
                      <h4>
                        <RiChatHistoryLine /> Past
                      </h4>
                    </div>
                    <div className={styles.rightcorner}>
                      <h4 className={styles.rightcorner_first}>
                        <BiUser /> {storeListName} &nbsp;
                        <span>({storePersonId})</span>
                      </h4>
                      <h4
                        className={styles.rightcorner_last}
                        onClick={() => {
                          setCurrentOrPast(true);
                        }}
                      >
                        <MdOutlineRecentActors /> Current
                      </h4>
                    </div>

                    {listLoading ? (
                      <>
                        <div className={styles.pastdiv}>
                          {storePastBorrowed
                            .slice()
                            .reverse()
                            .map((get) => {
                              const sli = get.register_date;
                              const dateans = sli.slice(0, 10);
                              return (
                                <>
                                  <div className={styles.pastdivbox}>
                                    <div className={styles.pdb_top}>
                                      <h4>
                                        <span>On : </span>
                                        {dateans}
                                      </h4>
                                    </div>
                                    <div className={styles.pdb_bottom}>
                                      <p>
                                        <span>Book : </span>
                                        {get.selected_book}
                                      </p>
                                      <p>
                                        <span>Returned : </span>
                                        {get.return_date}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="box">
                          <div class="bouncing-bar">
                            <div class="line line_two"></div>
                            <div class="line line_two"></div>
                            <div class="line line_two"></div>
                            <div class="line line_two"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <ToastContainer
        transition={Flip}
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Dashboard;
