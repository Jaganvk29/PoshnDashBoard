import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/BlogSection"));

const Grid = lazy(() => import("../views/ui/Grid"));
const Responses = lazy(() => import("../views/ui/Responses.js"));
const DietSurvey = lazy(() => import("../views/ui/DietSurvey.js"));
const Booking = lazy(() => import("../views/ui/Booking.js"));

// About
const CreateAbout = lazy(() => import("../views/ui/About/CreateAbout.js"));

// MY Products Sectio
const MyProducts = lazy(() => import("../views/ui/MyProducts.js"));
const EditProducts = lazy(() =>
  import("../views/ui/MyProducts/EditProducts.js")
);

const CreateCategory = lazy(() =>
  import("../views/ui/MyProducts/CreateCategory.js")
);

const CreateProducts = lazy(() =>
  import("../views/ui/MyProducts/CreateProducts.js")
);

const EditCategoryHome = lazy(() =>
  import("../views/ui/MyProducts/EditCategoryHome.js")
);

const EditCategory = lazy(() =>
  import("../views/ui/MyProducts/EditCategory.js")
);
// RESPONSES - SECTION
const ResponseDetail = lazy(() =>
  import("../views/ui/Responses/ResponseDetail.js")
);

// BLOG SECTION - CRUD OPERATION
const BlogSection = lazy(() => import("../views/ui/BlogSection"));
const BlogEditHome = lazy(() =>
  import("../views/ui/CreateBlog/BlogEditHome.js")
);
const DraftedBlog = lazy(() => import("../views/ui/CreateBlog/DraftedBlog.js"));

// FAQ SECTION - CRUD OPERATION
const CreateFaq = lazy(() => import("../views/ui/CreateFaq/CreateFaq.js"));
const EditFaq = lazy(() => import("../views/ui/CreateFaq/EditFaq.js"));
const BlogEdit = lazy(() => import("../views/ui/CreateBlog/BlogEdit.js"));
const Faq = lazy(() => import("../views/ui/Faq"));

const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/createabout", exact: true, element: <CreateAbout /> },

      // BLOG ROUTES
      { path: "/blog", exact: true, element: <BlogSection /> },
      { path: "/createblog", exact: true, element: <BlogEditHome /> },
      { path: "/editblog/:blogid", exact: true, element: <BlogEdit /> },
      { path: "/draft", exact: true, element: <DraftedBlog /> },

      // FAQ ROUTES
      { path: "/faq", exact: true, element: <Faq /> },
      { path: "/createfaq", exact: true, element: <CreateFaq /> },
      { path: "/faqedit/:id", element: <EditFaq /> },

      { path: "/dietsurvey", exact: true, element: <DietSurvey /> },
      { path: "/booking", exact: true, element: <Booking /> },

      // MYPRODUCTS
      { path: "/myproducts", exact: true, element: <MyProducts /> },
      { path: "/createproducts", exact: true, element: <CreateProducts /> },
      { path: "/createcategory", exact: true, element: <CreateCategory /> },
      { path: "/editecategory", exact: true, element: <EditCategoryHome /> },
      { path: "/editecategory/:catid", exact: true, element: <EditCategory /> },

      {
        path: "/myproducts/:productid",
        exact: true,
        element: <EditProducts />,
      },

      // RESPONSES
      {
        path: "/responses",
        exact: true,
        element: <Responses />,
      },

      // { path: "/alerts", exact: true, element: <Alerts /> },
      // { path: "/badges", exact: true, element: <Badges /> },
      // { path: "/buttons", exact: true, element: <Buttons /> },
      // { path: "/blog", exact: true, element: <Cards /> },
      // { path: "/grid", exact: true, element: <Grid /> },
      // { path: "/table", exact: true, element: <Tables /> },
      // { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
