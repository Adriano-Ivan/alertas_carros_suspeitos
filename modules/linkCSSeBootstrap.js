module.exports = () => {
  const endeCSS = `http://localhost:${process.env.PORT}/public/css/style.css`;
  const ende = `http://localhost:${process.env.PORT}/public/bootstrap_css/bootstrap.min.css`;
  return `${ende}|${endeCSS}`;
};
