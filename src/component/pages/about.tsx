import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <h1>Test</h1>
      <p>Testing</p>
      <Link to="/productPage" className="text-blue-500 hover:underline">Trang sản phẩm</Link>
    </>
  );
}

export default About;