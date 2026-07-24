// Shared star SVG designs for every storefront surface (review widget,
// product rating badge, form stars). Mirrors STAR_DESIGNS in
// app/routes/data/widgetDefaults.js (the admin/preview source of truth) —
// keep the two in sync. "rounded" is the app's design and the default.
//
// Loaded by multiple blocks; the guard makes double-loading harmless.
(function () {
  if (window.JM_STAR_DESIGNS) return;

  window.JM_STAR_DESIGNS = {
    rounded: {
      filled: {
        d: "M15.791,19.5,10.262,16.6,4.732,19.5a.75.75,0,0,1-1.088-.79L4.7,12.557.228,8.2a.75.75,0,0,1,.415-1.28l6.182-.9L9.589.419a.75.75,0,0,1,1.345,0l2.764,5.6,6.182.9A.751.751,0,0,1,20.3,8.2l-4.473,4.36,1.056,6.157a.748.748,0,0,1-1.088.79Z",
        transform: "translate(1.739 1.25)",
      },
      empty: {
        d: "M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z",
        strokeWidth: 1.5,
      },
    },
    pointed: {
      filled: {
        d: "M12 2L15 9H22L17 14L19 22L12 18L5 22L7 14L2 9H9L12 2Z",
      },
      empty: {
        d: "M12 2L15 9H22L17 14L19 22L12 18L5 22L7 14L2 9H9L12 2Z",
        strokeWidth: 1.5,
      },
    },
    classic: {
      filled: {
        d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
      },
      empty: {
        d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
        strokeWidth: 1.5,
      },
    },
  };

  // Builds one star as SVG markup.
  // options: { filled: bool, size: "18"|"1em", color: css color }
  window.jmStarSVG = function (styleKey, options) {
    var designs = window.JM_STAR_DESIGNS;
    var design = designs[styleKey] || designs.rounded;
    var opts = options || {};
    var filled = opts.filled !== false;
    var size = opts.size || "1em";
    var color = opts.color || "currentColor";
    var variant = filled ? design.filled : design.empty;
    var transform = variant.transform
      ? ' transform="' + variant.transform + '"'
      : "";
    var paint = filled
      ? 'fill="' + color + '"'
      : 'fill="none" stroke="' +
        color +
        '" stroke-width="' +
        (variant.strokeWidth || 1.5) +
        '" stroke-linecap="round" stroke-linejoin="round"';
    return (
      '<svg width="' +
      size +
      '" height="' +
      size +
      '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' +
      variant.d +
      '"' +
      transform +
      " " +
      paint +
      "></path></svg>"
    );
  };
})();
