/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lab-card/edit.js"
/*!******************************!*\
  !*** ./src/lab-card/edit.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/link-off.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/link.mjs");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/lab-card/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/**
 * Editor UI: image + title + description + CTA link.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */








/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {boolean}  props.isSelected
 * @return {Element} Element to render.
 */

function Edit({
  attributes,
  setAttributes,
  isSelected
}) {
  const {
    imageId,
    imageUrl,
    imageAlt,
    title,
    description,
    ctaText,
    ctaUrl,
    ctaOpensInNewTab
  } = attributes;
  const [isLinkOpen, setIsLinkOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: 'lab-card'
  });
  const image = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => imageId ? select('core').getMedia(imageId) : null, [imageId]);
  const onSelectImage = media => {
    setAttributes({
      imageId: media?.id,
      imageUrl: media?.url,
      imageAlt: media?.alt || ''
    });
  };
  const onRemoveImage = () => {
    setAttributes({
      imageId: undefined,
      imageUrl: '',
      imageAlt: ''
    });
  };
  const onChangeLink = (nextValue = {}) => {
    setAttributes({
      ctaUrl: nextValue?.url ?? '',
      ctaOpensInNewTab: nextValue?.opensInNewTab ?? false
    });
  };
  const onRemoveLink = () => {
    setAttributes({
      ctaUrl: '',
      ctaOpensInNewTab: false
    });
    setIsLinkOpen(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
          label: ctaUrl ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit CTA link', 'gutenberg-lab') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add CTA link', 'gutenberg-lab'),
          onClick: () => setIsLinkOpen(open => !open),
          isActive: !!ctaUrl || isLinkOpen
        }), ctaUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Remove CTA link', 'gutenberg-lab'),
          onClick: onRemoveLink
        })]
      })
    }), isLinkOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Popover, {
      placement: "bottom",
      onClose: () => setIsLinkOpen(false),
      focusOnMount: "firstElement",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.__experimentalLinkControl, {
        value: {
          url: ctaUrl,
          opensInNewTab: ctaOpensInNewTab
        },
        onChange: onChangeLink,
        onRemove: onRemoveLink,
        settings: [{
          id: 'opensInNewTab',
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Open in new tab', 'gutenberg-lab')
        }]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Image', 'gutenberg-lab'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
            onSelect: onSelectImage,
            allowedTypes: ['image'],
            value: imageId,
            render: ({
              open
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "lab-card-inspector-image",
              children: imageUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ResponsiveWrapper, {
                  naturalWidth: image?.media_details?.width || 640,
                  naturalHeight: image?.media_details?.height || 360,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                    src: imageUrl,
                    alt: imageAlt
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: open,
                  variant: "secondary",
                  style: {
                    marginTop: '8px'
                  },
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Replace image', 'gutenberg-lab')
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                  onClick: onRemoveImage,
                  isDestructive: true,
                  variant: "link",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Remove image', 'gutenberg-lab')
                })]
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                onClick: open,
                variant: "secondary",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select image', 'gutenberg-lab')
              })
            })
          })
        }), imageUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Image alt text', 'gutenberg-lab'),
          value: imageAlt,
          onChange: value => setAttributes({
            imageAlt: value
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Describe the image for screen readers.', 'gutenberg-lab')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Call to action', 'gutenberg-lab'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button text', 'gutenberg-lab'),
          value: ctaText,
          onChange: value => setAttributes({
            ctaText: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button URL', 'gutenberg-lab'),
          value: ctaUrl,
          onChange: value => setAttributes({
            ctaUrl: value
          }),
          type: "url",
          placeholder: "https://",
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Or use the link icon in the block toolbar.', 'gutenberg-lab')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Open in new tab', 'gutenberg-lab'),
          checked: !!ctaOpensInNewTab,
          onChange: value => setAttributes({
            ctaOpensInNewTab: value
          })
        }), ctaUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
          className: "lab-card__cta-url-preview",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
            href: ctaUrl,
            target: "_blank",
            rel: "noreferrer",
            children: ctaUrl
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "lab-card__media",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
            onSelect: onSelectImage,
            allowedTypes: ['image'],
            value: imageId,
            render: ({
              open
            }) => imageUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("button", {
              type: "button",
              className: "lab-card__image-button",
              onClick: open,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                className: "lab-card__image",
                src: imageUrl,
                alt: imageAlt
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "lab-card__image-hint",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Click to replace image', 'gutenberg-lab')
              })]
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
              className: "lab-card__image-placeholder",
              onClick: open,
              variant: "secondary",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Upload / select image', 'gutenberg-lab')
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "lab-card__body",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
          tagName: "h3",
          className: "lab-card__title",
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add title…', 'gutenberg-lab'),
          value: title,
          onChange: value => setAttributes({
            title: value
          }),
          allowedFormats: []
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
          tagName: "p",
          className: "lab-card__description",
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add description…', 'gutenberg-lab'),
          value: description,
          onChange: value => setAttributes({
            description: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "lab-card__cta-row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
            tagName: "span",
            className: "lab-card__cta lab-card__cta--preview",
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Learn more', 'gutenberg-lab'),
            value: ctaText,
            onChange: value => setAttributes({
              ctaText: value
            }),
            allowedFormats: [],
            withoutInteractiveFormatting: true
          }), isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
            className: "lab-card__link-button",
            icon: ctaUrl ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
            label: ctaUrl ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit link', 'gutenberg-lab') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add link', 'gutenberg-lab'),
            onClick: () => setIsLinkOpen(true),
            variant: "tertiary",
            size: "small"
          })]
        }), ctaUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("p", {
          className: "lab-card__cta-hint lab-card__cta-hint--linked",
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Linked to:', 'gutenberg-lab'), ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("code", {
            children: ctaUrl
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
          className: "lab-card__cta-hint",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Click the link icon in the toolbar (or beside the button) to add a URL.', 'gutenberg-lab')
        })]
      })]
    })]
  });
}

/***/ },

/***/ "./src/lab-card/index.js"
/*!*******************************!*\
  !*** ./src/lab-card/index.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/lab-card/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/lab-card/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/lab-card/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/lab-card/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/lab-card/save.js"
/*!******************************!*\
  !*** ./src/lab-card/save.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/**
 * Dynamic block: frontend HTML comes from render.php.
 * Returning null stores only the block comment + attributes.
 *
 * @return {null}
 */
function save() {
  return null;
}

/***/ },

/***/ "./src/lab-card/editor.scss"
/*!**********************************!*\
  !*** ./src/lab-card/editor.scss ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/lab-card/style.scss"
/*!*********************************!*\
  !*** ./src/lab-card/style.scss ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/link-off.mjs"
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/link-off.mjs ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ link_off_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/link-off.tsx


var link_off_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z" }) });

//# sourceMappingURL=link-off.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/link.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/link.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ link_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/link.tsx


var link_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z" }) });

//# sourceMappingURL=link.mjs.map


/***/ },

/***/ "./src/lab-card/block.json"
/*!*********************************!*\
  !*** ./src/lab-card/block.json ***!
  \*********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/lab-card","version":"0.3.0","title":"Lab Card","category":"widgets","icon":"format-image","description":"One card: image, title, description, and CTA link. Use inside Lab Cards.","keywords":["card","image","cta","lab"],"parent":["create-block/lab-cards"],"attributes":{"imageId":{"type":"number"},"imageUrl":{"type":"string","default":""},"imageAlt":{"type":"string","default":""},"title":{"type":"string","default":""},"description":{"type":"string","default":""},"ctaText":{"type":"string","default":"Learn more"},"ctaUrl":{"type":"string","default":""},"ctaOpensInNewTab":{"type":"boolean","default":false}},"supports":{"color":{"background":true,"text":true},"spacing":{"padding":true},"html":false,"reusable":false},"textdomain":"gutenberg-lab","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			let notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn, priority] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"lab-card/index": 0,
/******/ 			"lab-card/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = globalThis["webpackChunkgutenberg_lab"] ||= [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["lab-card/style-index"], () => (__webpack_require__("./src/lab-card/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map