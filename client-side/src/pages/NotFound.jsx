import notfound from "../assets/notfound.svg"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Link to="/" className="notFound">
      <img src={notfound} alt="not found image" />
      <p>The page does not exist.</p>
    </Link>
  )
}

export default NotFound

