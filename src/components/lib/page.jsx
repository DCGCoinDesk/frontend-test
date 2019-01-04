import slugify from "to-slug-case";

let pageDepth = 0;

export class Page extends Component {
  componentDidMount() {
    let { updatePageMeta, title } = this.props;
    if (pageDepth > 0) {
      window.scrollTo(0, 0);
    }
    pageDepth++;
    updatePageMeta({
      title: title
    });
  }
  render() {
    let { title, children } = this.props;
    return (
      <section id={`${slugify(title)}-page`} className="page">
        <div id="container">
          <div id="content">{children}</div>
        </div>
      </section>
    );
  }
}

Page = connect(
  null,
  dispatch => ({
    updatePageMeta: payload =>
      dispatch({
        type: "PAGE_UPDATE",
        payload
      })
  })
)(Page);

Page.propTypes = {
  children: PropTypes.any,
  updatePageMeta: PropTypes.func,
  title: PropTypes.string.isRequired
};
