(window.webpackJsonp = window.webpackJsonp || []).push([
  [4],
  {
    163: function (e, t, a) {
      "use strict";
      a.r(t),
        a.d(t, "query", function () {
          return p;
        });
      var n = a(0),
        r = a.n(n),
        l = a(175),
        i = a.n(l),
        c = a(4),
        o = a.n(c),
        s = a(173),
        m = a(174),
        u = function (e) {
          var t = e.data.allMarkdownRemark.edges;
          return r.a.createElement(
            m.d,
            null,
            r.a.createElement(i.a, { title: "Tagged List" }),
            r.a.createElement(
              s.b,
              { title: "Tagged List" },
              "Same Content, More Easily Seen Tags"
            ),
            t.map(function (e) {
              var t = e.node;
              return r.a.createElement(s.a, {
                key: t.id,
                path: t.frontmatter.path,
                title: t.frontmatter.title,
                chapter: t.frontmatter.chapter,
                subtitle: t.frontmatter.subtitle,
                date: t.frontmatter.date,
                tags: t.frontmatter.tags,
                excerpt: t.excerpt,
              });
            })
          );
        };
      (t.default = u),
        (u.propTypes = {
          data: o.a.shape({
            allMarkdownRemark: o.a.shape({
              edges: o.a.arrayOf(
                o.a.shape({
                  node: o.a.shape({
                    excerpt: o.a.string,
                    frontmatter: o.a.shape({
                      path: o.a.string.isRequired,
                      title: o.a.string.isRequired,
                      chapter: o.a.string,
                      subtitle: o.a.string,
                      date: o.a.string.isRequired,
                      tags: o.a.array,
                    }),
                  }),
                }).isRequired
              ),
            }),
          }),
        });
      var p = "2424041589";
    },
    167: function (e, t, a) {
      "use strict";
      a.d(t, "b", function () {
        return m;
      });
      var n = a(0),
        r = a.n(n),
        l = a(4),
        i = a.n(l),
        c = a(33),
        o = a.n(c);
      a.d(t, "a", function () {
        return o.a;
      });
      a(168);
      var s = r.a.createContext({}),
        m = function (e) {
          return r.a.createElement(s.Consumer, null, function (t) {
            return e.data || (t[e.query] && t[e.query].data)
              ? (e.render || e.children)(e.data ? e.data.data : t[e.query].data)
              : r.a.createElement("div", null, "Loading (StaticQuery)");
          });
        };
      m.propTypes = {
        data: i.a.object,
        query: i.a.string.isRequired,
        render: i.a.func,
        children: i.a.func,
      };
    },
    168: function (e, t, a) {
      var n;
      e.exports = ((n = a(170)) && n.default) || n;
    },
    169: function (e, t, a) {
      e.exports = a.p + "static/speed-ef64ba6bb722b02d93e341af50253a73.jpg";
    },
    170: function (e, t, a) {
      "use strict";
      a.r(t);
      a(34);
      var n = a(0),
        r = a.n(n),
        l = a(4),
        i = a.n(l),
        c = a(55),
        o = a(2),
        s = function (e) {
          var t = e.location,
            a = o.default.getResourcesForPathnameSync(t.pathname);
          return a
            ? r.a.createElement(
                c.a,
                Object.assign({ location: t, pageResources: a }, a.json)
              )
            : null;
        };
      (s.propTypes = {
        location: i.a.shape({ pathname: i.a.string.isRequired }).isRequired,
      }),
        (t.default = s);
    },
    171: function (e, t) {
      e.exports =
        "data:image/png;base64,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";
    },
    172: function (e) {
      e.exports = {
        data: {
          site: {
            buildTime: "2019-10-13",
            siteMetadata: {
              defaultTitle: "Notes for Great Good",
              titleAlt: "Notes for Great Good",
              shortName: "Notes",
              author: "Amy Shackles",
              siteLanguage: "en",
              logo: "static/logo/logo.png",
              siteUrl: "https://notes-for-great-good.netlify.com",
              pathPrefix: "/",
              defaultDescription: "Notes for Great Good",
              defaultBanner: "static/logo/banner.png",
              twitter: "@amyshackles",
            },
          },
        },
      };
    },
    173: function (e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(4),
        i = a.n(l),
        c = a(167),
        o = (a(153), a(169)),
        s = a.n(o),
        m = function (e) {
          var t = e.path,
            a = e.title,
            n = e.date,
            l = e.chapter,
            i = e.subtitle,
            o = e.tags;
          return r.a.createElement(
            "article",
            null,
            r.a.createElement(
              "div",
              { className: "bloglist-image" },
              r.a.createElement(
                c.a,
                { to: t, title: a },
                r.a.createElement("img", { src: s.a, alt: "" })
              )
            ),
            r.a.createElement(
              "div",
              { className: "bloglist-information" },
              r.a.createElement("div", { className: "bloglist-date" }, n),
              r.a.createElement(
                c.a,
                { to: t },
                a,
                r.a.createElement("br", null),
                r.a.createElement(
                  "div",
                  { className: "bloglist-title" },
                  l,
                  l ? r.a.createElement("br", null) : null,
                  i
                )
              ),
              r.a.createElement(N, { list: o })
            )
          );
        },
        u = m;
      m.propTypes = {
        path: i.a.string.isRequired,
        date: i.a.string.isRequired,
        title: i.a.string.isRequired,
        chapter: i.a.string,
        subtitle: i.a.string,
        excerpt: i.a.string,
        tags: i.a.array.isRequired,
      };
      a(154);
      var p = function (e) {
          var t = e.children,
            a = e.title,
            n = e.chapter,
            l = e.subtitle,
            i = e.date;
          return r.a.createElement(
            "div",
            { className: "header-wrapper" },
            r.a.createElement(
              "div",
              { className: "header-text" },
              a ? r.a.createElement("h1", null, a) : null,
              n ? r.a.createElement("h2", null, n) : null,
              l ? r.a.createElement("h3", null, l) : null,
              i ? r.a.createElement("h4", null, i) : null,
              t && r.a.createElement("div", { className: "header-subtitle" }, t)
            )
          );
        },
        d = p;
      (p.propTypes = {
        children: i.a.oneOfType([i.a.node, i.a.bool]),
        date: i.a.oneOfType([i.a.string, i.a.bool]),
        title: i.a.oneOfType([i.a.string, i.a.object, i.a.bool]),
        chapter: i.a.oneOfType([i.a.string, i.a.bool]),
        subtitle: i.a.oneOfType([i.a.string, i.a.bool]),
      }),
        (p.defaultProps = { children: !1, date: !1, title: !1 });
      a(155);
      var g = function (e) {
          var t = e.path,
            a = e.date,
            n = e.title,
            l = e.chapter,
            i = e.subtitle;
          return r.a.createElement(
            "div",
            { className: "postlist-wrapper" },
            r.a.createElement(
              "div",
              { className: "postlist-image" },
              r.a.createElement("img", { src: s.a, alt: "" })
            ),
            r.a.createElement(
              c.a,
              { className: "postlist-styledLink", to: t },
              r.a.createElement(
                "div",
                { className: "postlist-info" },
                r.a.createElement(
                  "div",
                  null,
                  r.a.createElement("span", null, a),
                  r.a.createElement(
                    "div",
                    { className: "postlist-title" },
                    r.a.createElement("h2", null, n),
                    r.a.createElement(
                      "span",
                      null,
                      r.a.createElement("h3", null, l)
                    ),
                    r.a.createElement("span", null, i)
                  )
                )
              )
            )
          );
        },
        A = g;
      g.propTypes = {
        path: i.a.string.isRequired,
        subtitle: i.a.string,
        chapter: i.a.string,
        date: i.a.string.isRequired,
        title: i.a.string.isRequired,
      };
      var f = a(172),
        h = a(175),
        E = a.n(h),
        y = function (e) {
          var t = e.title,
            a = e.desc,
            n = e.banner,
            l = e.pathname,
            i = e.article;
          return r.a.createElement(c.b, {
            query: b,
            render: function (e) {
              var c = e.site,
                o = c.buildTime,
                s = c.siteMetadata,
                m = s.defaultTitle,
                u = s.titleAlt,
                p = s.shortName,
                d = s.author,
                g = s.siteLanguage,
                A = s.logo,
                f = s.siteUrl,
                h = s.pathPrefix,
                y = s.defaultDescription,
                b = s.defaultBanner,
                v = s.twitter,
                N = {
                  title: t || m,
                  description: y || a,
                  image: "" + f + (n || b),
                  url: "" + f + (l || "/"),
                },
                R = [
                  {
                    "@context": "http://schema.org",
                    "@type": "WebSite",
                    "@id": f,
                    url: f,
                    name: m,
                    alternateName: u || "",
                  },
                ];
              return (
                i &&
                  (R = [
                    {
                      "@context": "http://schema.org",
                      "@type": "BlogPosting",
                      "@id": N.url,
                      url: N.url,
                      name: t,
                      alternateName: u || "",
                      headline: t,
                      image: { "@type": "ImageObject", url: N.image },
                      description: N.description,
                      datePublished: o,
                      dateModified: o,
                      author: { "@type": "Person", name: d },
                      publisher: {
                        "@type": "Organization",
                        name: d,
                        logo: {
                          "@type": "ImageObject",
                          url: f + ("/" === h ? "" : h) + A,
                        },
                      },
                      isPartOf: f,
                      mainEntityOfPage: { "@type": "WebSite", "@id": f },
                    },
                  ]),
                r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(
                    E.a,
                    { title: N.title },
                    r.a.createElement("html", { lang: g }),
                    r.a.createElement("meta", {
                      name: "description",
                      content: N.description,
                    }),
                    r.a.createElement("meta", {
                      name: "image",
                      content: N.image,
                    }),
                    r.a.createElement("meta", {
                      name: "apple-mobile-web-app-title",
                      content: p,
                    }),
                    r.a.createElement("meta", {
                      name: "application-name",
                      content: p,
                    }),
                    r.a.createElement(
                      "script",
                      { type: "application/ld+json" },
                      JSON.stringify(R)
                    ),
                    r.a.createElement("meta", {
                      property: "og:url",
                      content: N.url,
                    }),
                    r.a.createElement("meta", {
                      property: "og:type",
                      content: i ? "article" : null,
                    }),
                    r.a.createElement("meta", {
                      property: "og:title",
                      content: N.title,
                    }),
                    r.a.createElement("meta", {
                      property: "og:description",
                      content: N.description,
                    }),
                    r.a.createElement("meta", {
                      property: "og:image",
                      content: N.image,
                    }),
                    r.a.createElement("meta", {
                      name: "twitter:card",
                      content: "summary_large_image",
                    }),
                    r.a.createElement("meta", {
                      name: "twitter:creator",
                      content: v,
                    }),
                    r.a.createElement("meta", {
                      name: "twitter:title",
                      content: N.title,
                    }),
                    r.a.createElement("meta", {
                      name: "twitter:description",
                      content: N.description,
                    }),
                    r.a.createElement("meta", {
                      name: "twitter:image",
                      content: N.image,
                    })
                  )
                )
              );
            },
            data: f,
          });
        };
      (y.propTypes = {
        title: i.a.string,
        desc: i.a.string,
        banner: i.a.string,
        pathname: i.a.string,
        article: i.a.bool,
      }),
        (y.defaultProps = {
          title: null,
          desc: null,
          banner: null,
          pathname: null,
          article: !1,
        });
      var b = "2288919696",
        v =
          (a(156),
          function (e) {
            var t = e.list;
            return r.a.createElement(
              "div",
              { className: "tagsContainer" },
              t &&
                t.map(function (e, t) {
                  var a = e.charAt(0).toUpperCase() + e.slice(1);
                  return r.a.createElement(
                    c.a,
                    { key: e + t, to: "/tags/" + e },
                    r.a.createElement("span", null, a)
                  );
                })
            );
          }),
        N = v;
      (v.propTypes = { list: i.a.array }),
        a.d(t, "a", function () {
          return u;
        }),
        a.d(t, "b", function () {
          return d;
        }),
        a.d(t, "c", function () {
          return A;
        }),
        a.d(t, "d", function () {
          return N;
        });
    },
    174: function (e, t, a) {
      "use strict";
      var n = a(0),
        r = a.n(n),
        l = a(4),
        i = a.n(l),
        c =
          (a(146),
          function (e) {
            var t = e.children,
              a = e.type,
              n = e.className,
              l = e.center;
            return r.a.createElement(
              "section",
              { className: "wrapper" },
              r.a.createElement("div", { className: n, type: a, center: l }, t)
            );
          }),
        o = c;
      c.propTypes = {
        children: i.a.oneOfType([i.a.array, i.a.node]).isRequired,
        type: i.a.string,
        className: i.a.string,
        center: i.a.object,
      };
      a(145), a(147);
      var s = function (e) {
          var t = e.input;
          return r.a.createElement("div", {
            className: "content-wrapper",
            dangerouslySetInnerHTML: { __html: t },
          });
        },
        m = s;
      s.propTypes = { input: i.a.any.isRequired };
      a(148);
      var u = function () {
          return r.a.createElement(
            "footer",
            { className: "footer-wrapper" },
            r.a.createElement(
              "div",
              { className: "footer-text" },
              r.a.createElement(
                "span",
                null,
                "Notes for Great Good    ",
                r.a.createElement(
                  "span",
                  { role: "img", "aria-label": "pawprints" },
                  "🐾"
                ),
                r.a.createElement(
                  "a",
                  { href: "https://amyshackles.com" },
                  "Amy Shackles"
                )
              )
            )
          );
        },
        p =
          (a(149),
          a(150),
          a(151),
          function (e) {
            var t = e.children;
            return r.a.createElement(
              "div",
              null,
              r.a.createElement(
                n.Fragment,
                null,
                r.a.createElement(y, null),
                t,
                r.a.createElement(u, null)
              )
            );
          }),
        d = p;
      p.propTypes = {
        children: i.a.oneOfType([i.a.array, i.a.node]).isRequired,
      };
      var g = a(167),
        A = a(176),
        f = a.n(A),
        h = a(171),
        E = a.n(h),
        y =
          (a(152),
          function () {
            return r.a.createElement(
              f.a,
              { calcHeightOnResize: !0, disableInlineStyles: !0 },
              r.a.createElement(
                g.a,
                { className: "navbar-styledLink", to: "/" },
                r.a.createElement("img", { src: E.a, alt: "Gatsby Logo" })
              ),
              r.a.createElement(
                "nav",
                { className: "navbar-nav" },
                r.a.createElement(g.a, { to: "/" }, "Home"),
                r.a.createElement(g.a, { to: "/blog" }, "Tagged List")
              )
            );
          });
      a.d(t, "a", function () {
        return o;
      }),
        a.d(t, "b", function () {
          return m;
        }),
        a.d(t, "c", function () {
          return u;
        }),
        a.d(t, "d", function () {
          return d;
        }),
        a.d(t, "e", function () {
          return y;
        });
    },
  },
]);
//# sourceMappingURL=component---src-pages-blog-jsx-316bdf552f6880939952.js.map
