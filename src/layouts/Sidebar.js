import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Myproducts",
    href: "/myproducts",
    icon: "bi bi bi-diagram-2",
  },

  {
    title: "Blog",
    href: "/blog",
    icon: "bi bi-newspaper",
  },

  {
    title: "FAQ",
    href: "/faq",
    icon: "bi bi-question-circle",
  },

  {
    title: "Diet Survey",
    href: "/dietsurvey",
    icon: "bi bi-bar-chart",
  },

  {
    title: "Booking",
    href: "/booking",
    icon: "bi bi-table",
  },
  {
    title: "Responses",
    href: "/responses",
    icon: "bi bi-chat-left-dots",
  },

  {
    title: "Partners",
    href: "/partners",
    icon: "bi bi-people",
  },

  {
    title: "About",
    href: "/about",
    icon: "bi bi-file-earmark-person",
  },
];

const Sidebar = () => {
  const hideshowMobilemenu = () => {
    const isopensidebar = document.getElementById("sidebarArea");
    if (isopensidebar.classList.contains("showSidebar")) {
      document.getElementById("sidebarArea").classList.remove("showSidebar");
    }
  };

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>

      <div className="p-3 mt-2 sidebarNav-container">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem
              onClick={hideshowMobilemenu}
              key={index}
              className="sidenav-bg"
            >
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
