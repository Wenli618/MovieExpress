

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className="footer">
      <p>&copy; {getCurrentYear()} Movie Express</p>
    </div>
  )
}

export default Footer
