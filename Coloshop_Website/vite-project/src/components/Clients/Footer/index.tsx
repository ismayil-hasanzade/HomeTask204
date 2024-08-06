const Footer = () => {
  return (
    <footer id="Footer">
      <div className="container">
        <div className="topnav">
          <ul className="navigatinonsbtns">
            <li>Blog</li>
            <li>Faq`S</li>
            <li>Contact us</li>
          </ul>
          <ul className="socialmediabtns">
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </ul>
        </div>
        <div className="bottomnav">
          <p>
            ©2018 All Rights Reserverd. This template is made with{" "}
            <i className="fa-regular fa-heart"></i> by <a href="#"> Colorlib</a>{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
