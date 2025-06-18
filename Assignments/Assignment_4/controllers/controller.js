export const loginRouteController=(req, res) => {
  res.render('pages/login', { title: 'Login', error: null });
}