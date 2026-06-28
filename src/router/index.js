import routes from "../config/routes";
import About from "../pages/About";
import Skills from "../pages/Skills";
import NotFound from "../pages/404";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/Projects/projectsInfo";
import Pinterest from "../pages/Pinterest";
import HentaiList from "../pages/HentaiList";
import Blog from "../pages/Blog";
import BlogPost from "../pages/Blog/BlogPost";
import Anime from "../pages/Anime";
import NuoiToi from "../pages/NuoiToi";

const publicRoutes = [
  { path: routes.about, component: About },
  { path: routes.skill, component: Skills },
  { path: routes.projects, component: Projects },
  { path: routes.pinterest, component: Pinterest },
  { path: routes.hentai, component: HentaiList },
  { path: routes.blog, component: Blog },
  { path: routes.blogPost, component: BlogPost },
  { path: routes.anime, component: Anime },
  { path: routes.nuoitoi, component: NuoiToi },
  { path: routes.projectDetails, component: ProjectDetails },
  { path: routes.notfound, component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
