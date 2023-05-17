import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { SubjectsPage } from "@presentation/pages/SubjectsPage";
import { CoursesPage } from "@presentation/pages/CoursesPage";
import { LaboratoriesPage } from "@presentation/pages/LaboratoriesPage";
import {SingleSubjectPage} from "@presentation/pages/SingleSubjectPage";
import {SingleCoursePage} from "@presentation/pages/SingleCoursePage";
import {SingleLaboratoryPage} from "@presentation/pages/SingleLaboratoryPage";
import { AppRoute } from "routes";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
          <Route path ={AppRoute.SingleSubject} element = {<SingleSubjectPage/>}/>
          <Route path ={AppRoute.SingleCourse} element = {<SingleCoursePage/>}/>
          <Route path ={AppRoute.SingleLaboratory} element = {<SingleLaboratoryPage/>}/>
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />}
        {isAdmin && <Route path={AppRoute.Subjects} element={<SubjectsPage />} />}
        {isAdmin && <Route path={AppRoute.Courses} element={<CoursesPage />} />}
        {isAdmin && <Route path={AppRoute.Laboratories} element={<LaboratoriesPage />} />}
      </Routes>
    </AppIntlProvider>
}
