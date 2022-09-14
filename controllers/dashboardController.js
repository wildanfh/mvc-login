const dashboardView = (req, res) => {
  res.render("dashboard", {
    user: req.user
  });
};

const dashboardLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
}

module.exports = { dashboardView, dashboardLogout };