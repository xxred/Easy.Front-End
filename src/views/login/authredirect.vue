<script>
// import { setToken, getToken } from "../../utils/auth";
export default {
  name: 'AuthRedirect',
  created() {
    const token = decodeURIComponent(
      window.location.search.replace('?token=', '')
    )
    // setToken(token);
    // const hash = window.location.search.slice(1);
    // const hash = window.location.hash.replace("#/auth-redirect#", "");

    // if (search.length > 1) {
    //   search = window.location.search + "&" + search.slice(1);
    // } else {
    //   search = window.location.search;
    // }
    let location
    if (window.opener) {
      location = window.opener.location
      location.href =
        // location.origin + location.pathname + location.search + "#" + hash;
        location.origin + location.pathname + location.search + '#' + token
      window.close()
    } else {
      location = window.location
      location.href =
        location.origin + location.pathname + location.search + '#' + token
    }
  }
}
</script>
