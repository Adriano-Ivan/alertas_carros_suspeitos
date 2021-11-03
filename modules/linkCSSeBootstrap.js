module.exports = () => {
  const endeCSS = "http://localhost:8005/public/css/style.css";
  const ende = "http://localhost:8005/public/bootstrap_css/bootstrap.min.css";
  return `<link rel='stylesheet' href=${ende}><link rel='stylesheet' href=${endeCSS}>`;
};
