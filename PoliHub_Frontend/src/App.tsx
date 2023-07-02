import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { Route, Routes, RouteProps } from "react-router-dom";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { SubjectsPage } from "@presentation/pages/SubjectsPage";
import { CoursesPage } from "@presentation/pages/CoursesPage";
import { LaboratoriesPage } from "@presentation/pages/LaboratoriesPage";
import {SingleSubjectPage} from "@presentation/pages/SingleSubjectPage";
import {SingleCoursePage} from "@presentation/pages/SingleCoursePage";
import {SingleLaboratoryPage} from "@presentation/pages/SingleLaboratoryPage";
import {CourseInstancesPage} from "@presentation/pages/CourseInstancesPage";
import {LaboratoryInstancesPage} from "@presentation/pages/LaboratoryInstancesPage";
import { AppRoute } from "routes";
import RequireAuth from "@infrastructure/utils/RequireAuth"
import {SingleLaboratoryInstancePage} from "@presentation/pages/SingleLaboratoryInstancePage";
import {SingleCourseInstancePage} from "@presentation/pages/SingleCourseInstancePage";
import {UserAttendancesPage} from "@presentation/pages/UserAttendancesPage";
import {UserSchedulePage} from "@presentation/pages/UserSchedulePage";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import {ReactNode} from 'react';

export function App() {
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Montserrat',
                'sans-serif'
            ].join(','),
        }
    });

    return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
        <ThemeProvider theme={theme}>
            <ToastNotifier />
            {/* This adds the routes and route mappings on the various components. */}
            <Routes>
                {/*Anybody*/}
                <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
                <Route path={AppRoute.Login} element={<LoginPage />} />

                {/*Students & Professors*/}
                    <Route element={<RequireAuth/>}>
                        <Route path ={AppRoute.SingleLaboratoryInstance} element = {<SingleLaboratoryInstancePage/>}/>
                        <Route path ={AppRoute.SingleCourseInstance} element = {<SingleCourseInstancePage/>}/>
                        <Route path ={AppRoute.UserAttendances} element = {<UserAttendancesPage/>}/>
                        <Route path ={AppRoute.UserSchedule} element = {<UserSchedulePage/>}/>

                        <Route path ={AppRoute.SingleSubject} element = {<SingleSubjectPage/>}/>
                        <Route path ={AppRoute.SingleCourse} element = {<SingleCoursePage/>}/>
                        <Route path ={AppRoute.SingleLaboratory} element = {<SingleLaboratoryPage/>}/>

                        {/*Admin*/}
                        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
                        {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />}
                        {isAdmin && <Route path={AppRoute.Subjects} element={<SubjectsPage />} />}
                        {isAdmin && <Route path={AppRoute.Courses} element={<CoursesPage />} />}
                        {isAdmin && <Route path={AppRoute.CourseInstances} element={<CourseInstancesPage />} />}
                        {isAdmin && <Route path={AppRoute.LaboratoryInstances} element={<LaboratoryInstancesPage />} />}
                        {isAdmin && <Route path={AppRoute.Laboratories} element={<LaboratoriesPage />} />}
                        {isAdmin && <Route path={AppRoute.Register} element={<RegisterPage />} />}
                    </Route>
            </Routes>
        </ThemeProvider>
    </AppIntlProvider>
}
