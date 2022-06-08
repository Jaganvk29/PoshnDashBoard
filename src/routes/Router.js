import { lazy } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Authentication from "../views/ui/Auth/Authentication.js";
import React from "react";

const Router = () => {
  /****Layouts*****/
  const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

  /***** Pages ****/

  const Starter = lazy(() => import("../views/Starter.js"));
  const About = lazy(() => import("../views/About.js"));

  const Responses = lazy(() => import("../views/ui/Responses.js"));
  const DietSurvey = lazy(() => import("../views/ui/DietSurvey.js"));
  const Booking = lazy(() => import("../views/ui/Booking.js"));

  // AUTH
  const ProtectedRoutes = lazy(() => import("./ProtectedRoutes.js"));

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
  const DraftedBlog = lazy(() =>
    import("../views/ui/CreateBlog/DraftedBlog.js")
  );

  // FAQ SECTION - CRUD OPERATION
  const CreateFaq = lazy(() => import("../views/ui/CreateFaq/CreateFaq.js"));
  const EditFaq = lazy(() => import("../views/ui/CreateFaq/EditFaq.js"));
  const BlogEdit = lazy(() => import("../views/ui/CreateBlog/BlogEdit.js"));
  const Faq = lazy(() => import("../views/ui/Faq"));

  // Partners

  const Partners = lazy(() => import("../views/ui/Partners/Partners.js"));

  const EditPartnerCategory = lazy(() =>
    import("../views/ui/Partners/EditPartnerCategory.js")
  );

  const PartnerCategoryHome = lazy(() =>
    import("../views/ui/Partners/PartnerCategoryHome.js")
  );

  const CreatePartnerCategory = lazy(() =>
    import("../views/ui/Partners/CreatePartnerCategory.js")
  );

  const CreatePartner = lazy(() =>
    import("../views/ui/Partners/CreatePartner.js")
  );
  const EditPartner = lazy(() => import("../views/ui/Partners/EditPartner.js"));

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<FullLayout />}>
            <Route path="starter" element={<Starter />} />
            <Route path="about" exact={true} element={<About />} />
            <Route path="createabout" exact={true} element={<CreateAbout />} />
            <Route path="blog" exact={true} element={<BlogSection />} />
            <Route path="createblog" exact={true} element={<BlogEditHome />} />
            <Route path="editblog/:blogid" element={<BlogEdit />} />
            <Route path="draft" element={<DraftedBlog />} />

            <Route path="faq" exact={true} element={<Faq />} />
            <Route path="createfaq" exact={true} element={<CreateFaq />} />
            <Route path="faqedit/:id" exact={true} element={<EditFaq />} />
            <Route path="dietsurvey" exact={true} element={<DietSurvey />} />
            <Route path="booking" exact={true} element={<Booking />} />
            <Route path="myproducts" exact={true} element={<MyProducts />} />
            <Route path="createabout" exact={true} element={<CreateAbout />} />

            <Route
              path="createproducts"
              exact={true}
              element={<CreateProducts />}
            />

            <Route
              path="createcategory"
              exact={true}
              element={<CreateCategory />}
            />
            <Route
              path="editecategory"
              exact={true}
              element={<EditCategoryHome />}
            />

            <Route
              path="editecategory/:catid"
              exact={true}
              element={<EditCategory />}
            />
            <Route
              path="myproducts/:productid"
              exact={true}
              element={<EditProducts />}
            />
            <Route path="responses" exact={true} element={<Responses />} />
            <Route path="partners" exact={true} element={<Partners />} />
            <Route
              path="createpartner"
              exact={true}
              element={<CreatePartner />}
            />

            <Route
              path="createpartnercategory"
              exact={true}
              element={<CreatePartnerCategory />}
            />

            <Route
              path="partnercategory"
              exact={true}
              element={<PartnerCategoryHome />}
            />
            <Route
              path="editpartnercategory/:pcatId"
              exact={true}
              element={<EditPartnerCategory />}
            />

            <Route path="editpartner/:partnerID" element={<EditPartner />} />
          </Route>
        </Route>
      </Routes>
      ;
    </div>
  );
};

export default Router;
