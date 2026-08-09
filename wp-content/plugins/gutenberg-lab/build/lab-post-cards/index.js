/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lab-post-cards/edit.js"
/*!************************************!*\
  !*** ./src/lab-post-cards/edit.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _post_card_preview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post-card-preview */ "./src/lab-post-cards/post-card-preview.js");
/* harmony import */ var _term_allowlist_control__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./term-allowlist-control */ "./src/lab-post-cards/term-allowlist-control.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./src/lab-post-cards/utils.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./editor.scss */ "./src/lab-post-cards/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
/**
 * Lab Post Cards — query or search-map posts into card UI.
 */










/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element} Element to render.
 */

function Edit({
  attributes,
  setAttributes
}) {
  const {
    columns,
    postsToShow,
    orderBy,
    order,
    search,
    categoryId,
    tagId,
    selectedPostIds = [],
    ctaText,
    showCta = true,
    showTerms = false,
    showCategories = true,
    showTags = true,
    maxTerms = 3,
    selectedTermIds = [],
    excerptLines,
    source = 'query'
  } = attributes;
  const isManual = source === 'manual';
  const [postSearch, setPostSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('');
  const {
    categories,
    tags,
    posts,
    searchedPosts,
    selectedPosts,
    isResolving,
    isSearching
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const {
      getEntityRecords,
      isResolving: storeIsResolving
    } = select('core');
    const query = {
      per_page: postsToShow,
      orderby: orderBy,
      order,
      _embed: true,
      status: 'publish'
    };
    if (isManual && selectedPostIds.length) {
      query.include = selectedPostIds;
      query.orderby = 'include';
      query.per_page = selectedPostIds.length;
    } else if (!isManual) {
      if (search) {
        query.search = search;
      }
      if (categoryId) {
        query.categories = [categoryId];
      }
      if (tagId) {
        query.tags = [tagId];
      }
    } else {
      query.include = [0];
      query.per_page = 1;
    }
    const searchQuery = {
      per_page: 12,
      status: 'publish',
      _fields: ['id', 'title']
    };
    if (postSearch) {
      searchQuery.search = postSearch;
    }
    const selectedQuery = {
      include: selectedPostIds.length ? selectedPostIds : [0],
      per_page: selectedPostIds.length || 1,
      orderby: 'include',
      _fields: ['id', 'title'],
      status: 'publish'
    };
    return {
      categories: getEntityRecords('taxonomy', 'category', {
        per_page: 100,
        hide_empty: false
      }) || [],
      tags: getEntityRecords('taxonomy', 'post_tag', {
        per_page: 100,
        hide_empty: false
      }) || [],
      posts: isManual && !selectedPostIds.length ? [] : getEntityRecords('postType', 'post', query),
      searchedPosts: getEntityRecords('postType', 'post', searchQuery) || [],
      selectedPosts: selectedPostIds.length ? getEntityRecords('postType', 'post', selectedQuery) || [] : [],
      isResolving: isManual && !selectedPostIds.length ? false : storeIsResolving('getEntityRecords', ['postType', 'post', query]),
      isSearching: storeIsResolving('getEntityRecords', ['postType', 'post', searchQuery])
    };
  }, [postsToShow, orderBy, order, search, categoryId, tagId, selectedPostIds, postSearch, isManual]);
  const categoryOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('All categories', 'gutenberg-lab'),
    value: '0'
  }, ...(categories || []).map(term => ({
    label: term.name,
    value: String(term.id)
  }))], [categories]);
  const tagOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('All tags', 'gutenberg-lab'),
    value: '0'
  }, ...(tags || []).map(term => ({
    label: term.name,
    value: String(term.id)
  }))], [tags]);
  const idToTitle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const map = {};
    [...(selectedPosts || []), ...(posts || []), ...(searchedPosts || [])].forEach(post => {
      map[post.id] = (0,_utils__WEBPACK_IMPORTED_MODULE_7__.getPostTitle)(post) || `#${post.id}`;
    });
    return map;
  }, [selectedPosts, posts, searchedPosts]);
  const mappedPosts = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => (selectedPostIds || []).map(id => ({
    id,
    title: idToTitle[id] || `#${id}`
  })), [selectedPostIds, idToTitle]);
  const searchResults = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => (searchedPosts || []).filter(post => !selectedPostIds.includes(post.id)), [searchedPosts, selectedPostIds]);
  const addPost = id => {
    if (selectedPostIds.includes(id)) {
      return;
    }
    setAttributes({
      source: 'manual',
      selectedPostIds: [...selectedPostIds, id]
    });
  };
  const removePost = id => {
    setAttributes({
      selectedPostIds: selectedPostIds.filter(postId => postId !== id)
    });
  };
  const movePost = (id, direction) => {
    const index = selectedPostIds.indexOf(id);
    if (index < 0) {
      return;
    }
    const next = index + direction;
    if (next < 0 || next >= selectedPostIds.length) {
      return;
    }
    const ids = [...selectedPostIds];
    [ids[index], ids[next]] = [ids[next], ids[index]];
    setAttributes({
      selectedPostIds: ids
    });
  };
  const clearMapped = () => {
    setAttributes({
      selectedPostIds: []
    });
  };
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: `lab-post-cards lab-cards lab-cards--columns-${columns}`,
    style: {
      '--lab-post-card-excerpt-lines': String(excerptLines || 3)
    }
  });
  const list = isManual ? (posts || []).slice().sort((a, b) => {
    return selectedPostIds.indexOf(a.id) - selectedPostIds.indexOf(b.id);
  }) : posts || [];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Content source', 'gutenberg-lab'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('How to fill cards', 'gutenberg-lab'),
          value: source,
          onChange: value => setAttributes({
            source: value
          }),
          isBlock: true,
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
            value: "query",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Query', 'gutenberg-lab')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
            value: "manual",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search & map', 'gutenberg-lab')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
          className: "lab-post-cards__help",
          children: isManual ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search posts and add them to this block. Order is preserved.', 'gutenberg-lab') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Automatically load posts by keyword, category, or tag.', 'gutenberg-lab')
        })]
      }), isManual ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Map posts', 'gutenberg-lab'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SearchControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search posts', 'gutenberg-lab'),
          value: postSearch,
          onChange: setPostSearch,
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Type to find posts…', 'gutenberg-lab'),
          __nextHasNoMarginBottom: true
        }), isSearching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "lab-post-cards__search-status",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {})
        }), !isSearching && searchResults.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("ul", {
          className: "lab-post-cards__search-results",
          children: searchResults.map(post => {
            const title = (0,_utils__WEBPACK_IMPORTED_MODULE_7__.getPostTitle)(post) || `#${post.id}`;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("li", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                className: "lab-post-cards__result-title",
                title: title,
                children: title
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                variant: "secondary",
                size: "small",
                onClick: () => addPost(post.id),
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add', 'gutenberg-lab')
              })]
            }, post.id);
          })
        }), !isSearching && postSearch && searchResults.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
          className: "lab-post-cards__help",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No matching posts. Try another keyword.', 'gutenberg-lab')
        }), mappedPosts.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "lab-post-cards__mapped-header",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("strong", {
              children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Mapped posts', 'gutenberg-lab'), ' ', "(", mappedPosts.length, ")"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              variant: "link",
              isDestructive: true,
              onClick: clearMapped,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Clear all', 'gutenberg-lab')
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("ul", {
            className: "lab-post-cards__mapped-list",
            children: mappedPosts.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("li", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                className: "lab-post-cards__mapped-title",
                title: item.title,
                children: item.title
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                className: "lab-post-cards__mapped-actions",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                  size: "small",
                  variant: "tertiary",
                  disabled: index === 0,
                  onClick: () => movePost(item.id, -1),
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Move up', 'gutenberg-lab'),
                  showTooltip: true,
                  children: "\u2191"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                  size: "small",
                  variant: "tertiary",
                  disabled: index === mappedPosts.length - 1,
                  onClick: () => movePost(item.id, 1),
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Move down', 'gutenberg-lab'),
                  showTooltip: true,
                  children: "\u2193"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                  size: "small",
                  variant: "tertiary",
                  isDestructive: true,
                  onClick: () => removePost(item.id),
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Remove', 'gutenberg-lab')
                })]
              })]
            }, item.id))
          })]
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Query', 'gutenberg-lab'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search posts', 'gutenberg-lab'),
          value: search,
          onChange: value => setAttributes({
            search: value
          }),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Keyword…', 'gutenberg-lab'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Leave empty for latest posts.', 'gutenberg-lab')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Category', 'gutenberg-lab'),
          value: String(categoryId || 0),
          options: categoryOptions,
          onChange: value => setAttributes({
            categoryId: parseInt(value, 10) || 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tag', 'gutenberg-lab'),
          value: String(tagId || 0),
          options: tagOptions,
          onChange: value => setAttributes({
            tagId: parseInt(value, 10) || 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Number of posts', 'gutenberg-lab'),
          value: postsToShow,
          onChange: value => setAttributes({
            postsToShow: value
          }),
          min: 1,
          max: 24
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Order by', 'gutenberg-lab'),
          value: orderBy,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date', 'gutenberg-lab'),
            value: 'date'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title', 'gutenberg-lab'),
            value: 'title'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Modified', 'gutenberg-lab'),
            value: 'modified'
          }],
          onChange: value => setAttributes({
            orderBy: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Order', 'gutenberg-lab'),
          value: order,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Descending', 'gutenberg-lab'),
            value: 'desc'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ascending', 'gutenberg-lab'),
            value: 'asc'
          }],
          onChange: value => setAttributes({
            order: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Card content', 'gutenberg-lab'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "lab-post-cards__panel-section",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show terms', 'gutenberg-lab'),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Off by default. When on, cards can show category and tag badges. Each card only shows terms assigned to that post.', 'gutenberg-lab'),
            checked: !!showTerms,
            onChange: value => setAttributes({
              showTerms: value
            })
          }), showTerms && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "lab-post-cards__panel-stack",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Categories', 'gutenberg-lab'),
              checked: !!showCategories,
              onChange: value => setAttributes({
                showCategories: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tags', 'gutenberg-lab'),
              checked: !!showTags,
              onChange: value => setAttributes({
                showTags: value
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Max terms per type', 'gutenberg-lab'),
              value: maxTerms,
              onChange: value => setAttributes({
                maxTerms: value
              }),
              min: 1,
              max: 10,
              help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Maximum category or tag badges shown on each card.', 'gutenberg-lab')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_term_allowlist_control__WEBPACK_IMPORTED_MODULE_6__["default"], {
              value: selectedTermIds,
              onChange: ids => setAttributes({
                selectedTermIds: ids
              }),
              showCategories: showCategories,
              showTags: showTags
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "lab-post-cards__panel-section lab-post-cards__panel-section--cta",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show CTA button', 'gutenberg-lab'),
            checked: !!showCta,
            onChange: value => setAttributes({
              showCta: value
            })
          }), showCta && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
            className: "lab-post-cards__panel-stack",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('CTA text', 'gutenberg-lab'),
              value: ctaText,
              onChange: value => setAttributes({
                ctaText: value
              })
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Layout', 'gutenberg-lab'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Columns', 'gutenberg-lab'),
          value: columns,
          onChange: value => setAttributes({
            columns: value
          }),
          min: 1,
          max: 4
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Excerpt lines', 'gutenberg-lab'),
          value: excerptLines,
          onChange: value => setAttributes({
            excerptLines: value
          }),
          min: 1,
          max: 12,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Clamp description text with an ellipsis after this many lines.', 'gutenberg-lab')
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      ...blockProps,
      children: [isResolving && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "lab-post-cards__loading",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {})
      }), !isResolving && list.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
        status: "info",
        isDismissible: false,
        children: isManual ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search and add posts in the sidebar to map them into cards.', 'gutenberg-lab') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No posts found. Adjust search, category, or tag.', 'gutenberg-lab')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "lab-cards__grid",
        children: list.map(post => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_post_card_preview__WEBPACK_IMPORTED_MODULE_5__["default"], {
          post: post,
          showCta: showCta,
          ctaText: ctaText,
          showTerms: showTerms,
          showCategories: showCategories,
          showTags: showTags,
          maxTerms: maxTerms,
          selectedTermIds: selectedTermIds
        }, post.id))
      })]
    })]
  });
}

/***/ },

/***/ "./src/lab-post-cards/index.js"
/*!*************************************!*\
  !*** ./src/lab-post-cards/index.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/lab-post-cards/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/lab-post-cards/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/lab-post-cards/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/lab-post-cards/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/lab-post-cards/post-card-preview.js"
/*!*************************************************!*\
  !*** ./src/lab-post-cards/post-card-preview.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostCardPreview)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lab-post-cards/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Editor preview for a single mapped/queried post card.
 */



/**
 * @param {Object}   props
 * @param {Object}   props.post
 * @param {boolean}  props.showCta
 * @param {string}   props.ctaText
 * @param {boolean}  props.showTerms
 * @param {boolean}  props.showCategories
 * @param {boolean}  props.showTags
 * @param {number}   props.maxTerms
 * @param {number[]} props.selectedTermIds
 * @return {Element}
 */

function PostCardPreview({
  post,
  showCta,
  ctaText,
  showTerms,
  showCategories,
  showTags,
  maxTerms,
  selectedTermIds = []
}) {
  const title = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getPostTitle)(post) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('(no title)', 'gutenberg-lab');
  const excerpt = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getPostExcerpt)(post);
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  const terms = showTerms ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getPostTerms)(post, {
    showCategories,
    showTags,
    maxTerms,
    selectedTermIds
  }) : [];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("article", {
    className: "lab-card lab-post-card",
    children: [image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "lab-card__media",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
        className: "lab-card__image",
        src: image,
        alt: title
      })
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "lab-card__body",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
        className: "lab-card__title",
        children: title
      }), terms.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
        className: "lab-post-card__terms",
        children: terms.map(term => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
          className: `lab-post-card__term lab-post-card__term--${term.taxonomy}`,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
            children: term.name
          })
        }, `${term.taxonomy}-${term.id}`))
      }) : null, excerpt ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "lab-card__description",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
          children: excerpt
        })
      }) : null, showCta ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "lab-card__cta-wrap",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "lab-card__cta",
          children: ctaText || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Read more', 'gutenberg-lab')
        })
      }) : null]
    })]
  });
}

/***/ },

/***/ "./src/lab-post-cards/save.js"
/*!************************************!*\
  !*** ./src/lab-post-cards/save.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
function save() {
  return null;
}

/***/ },

/***/ "./src/lab-post-cards/term-allowlist-control.js"
/*!******************************************************!*\
  !*** ./src/lab-post-cards/term-allowlist-control.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TermAllowlistControl)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Pick specific categories/tags to show as badges (optional allowlist).
 */






/**
 * @param {Object}   props
 * @param {number[]} props.value            Selected term IDs.
 * @param {Function} props.onChange
 * @param {boolean}  props.showCategories
 * @param {boolean}  props.showTags
 * @return {Element|null}
 */

function TermAllowlistControl({
  value = [],
  onChange,
  showCategories,
  showTags
}) {
  const [termSearch, setTermSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('');
  const selectedTermIds = value;
  const {
    searchedTerms,
    selectedTerms,
    isSearching
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const {
      getEntityRecords,
      isResolving
    } = select('core');
    const results = [];
    let searching = false;
    const searchArgs = {
      per_page: 12,
      hide_empty: false,
      _fields: ['id', 'name', 'taxonomy']
    };
    if (termSearch) {
      searchArgs.search = termSearch;
    }
    if (showCategories) {
      const cats = getEntityRecords('taxonomy', 'category', searchArgs) || [];
      results.push(...cats.map(t => ({
        ...t,
        taxonomy: 'category'
      })));
      searching = searching || isResolving('getEntityRecords', ['taxonomy', 'category', searchArgs]);
    }
    if (showTags) {
      const tags = getEntityRecords('taxonomy', 'post_tag', searchArgs) || [];
      results.push(...tags.map(t => ({
        ...t,
        taxonomy: 'post_tag'
      })));
      searching = searching || isResolving('getEntityRecords', ['taxonomy', 'post_tag', searchArgs]);
    }
    const selected = [];
    if (selectedTermIds.length) {
      if (showCategories) {
        const cats = getEntityRecords('taxonomy', 'category', {
          include: selectedTermIds,
          per_page: selectedTermIds.length,
          _fields: ['id', 'name'],
          hide_empty: false
        }) || [];
        selected.push(...cats.map(t => ({
          ...t,
          taxonomy: 'category'
        })));
      }
      if (showTags) {
        const tags = getEntityRecords('taxonomy', 'post_tag', {
          include: selectedTermIds,
          per_page: selectedTermIds.length,
          _fields: ['id', 'name'],
          hide_empty: false
        }) || [];
        selected.push(...tags.map(t => ({
          ...t,
          taxonomy: 'post_tag'
        })));
      }
    }
    return {
      searchedTerms: results,
      selectedTerms: selected,
      isSearching: searching
    };
  }, [termSearch, selectedTermIds, showCategories, showTags]);
  const idToTerm = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    const map = {};
    [...selectedTerms, ...searchedTerms].forEach(term => {
      map[term.id] = {
        id: term.id,
        name: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__.decodeEntities)(term.name || ''),
        taxonomy: term.taxonomy
      };
    });
    return map;
  }, [selectedTerms, searchedTerms]);
  const mappedTerms = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => selectedTermIds.map(id => {
    const term = idToTerm[id];
    return term || {
      id,
      name: `#${id}`,
      taxonomy: 'term'
    };
  }), [selectedTermIds, idToTerm]);
  const searchResults = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => searchedTerms.filter(term => !selectedTermIds.includes(term.id)), [searchedTerms, selectedTermIds]);
  if (!showCategories && !showTags) {
    return null;
  }
  const addTerm = id => {
    if (selectedTermIds.includes(id)) {
      return;
    }
    onChange([...selectedTermIds, id]);
  };
  const removeTerm = id => {
    onChange(selectedTermIds.filter(termId => termId !== id));
  };
  const clearAll = () => onChange([]);
  const typeLabel = taxonomy => taxonomy === 'post_tag' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tag', 'gutenberg-lab') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Category', 'gutenberg-lab');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "lab-post-cards__term-allowlist",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
      className: "lab-post-cards__help",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Optional allowlist for both categories and tags. Leave empty to show all assigned terms. Add terms like “Featured” to show only those badges when a post has them.', 'gutenberg-lab')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SearchControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search categories and tags', 'gutenberg-lab'),
      value: termSearch,
      onChange: setTermSearch,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Type to find a term…', 'gutenberg-lab'),
      __nextHasNoMarginBottom: true
    }), isSearching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "lab-post-cards__search-status",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    }), !isSearching && searchResults.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ul", {
      className: "lab-post-cards__search-results",
      children: searchResults.map(term => {
        const name = (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__.decodeEntities)(term.name || '');
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("li", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
            className: "lab-post-cards__result-title",
            title: name,
            children: [name, ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
              className: "lab-post-cards__term-type",
              children: ["(", typeLabel(term.taxonomy), ")"]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            variant: "secondary",
            size: "small",
            onClick: () => addTerm(term.id),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add', 'gutenberg-lab')
          })]
        }, `${term.taxonomy}-${term.id}`);
      })
    }), mappedTerms.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "lab-post-cards__mapped-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("strong", {
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show only these terms', 'gutenberg-lab'), ' ', "(", mappedTerms.length, ")"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          variant: "link",
          isDestructive: true,
          onClick: clearAll,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Clear', 'gutenberg-lab')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ul", {
        className: "lab-post-cards__mapped-list",
        children: mappedTerms.map(term => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("li", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
            className: "lab-post-cards__mapped-title",
            title: term.name,
            children: [term.name, ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
              className: "lab-post-cards__term-type",
              children: ["(", typeLabel(term.taxonomy), ")"]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            size: "small",
            variant: "tertiary",
            isDestructive: true,
            onClick: () => removeTerm(term.id),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Remove', 'gutenberg-lab')
          })]
        }, term.id))
      })]
    })]
  });
}

/***/ },

/***/ "./src/lab-post-cards/utils.js"
/*!*************************************!*\
  !*** ./src/lab-post-cards/utils.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPostExcerpt: () => (/* binding */ getPostExcerpt),
/* harmony export */   getPostTerms: () => (/* binding */ getPostTerms),
/* harmony export */   getPostTitle: () => (/* binding */ getPostTitle)
/* harmony export */ });
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Shared helpers for Lab Post Cards editor preview.
 */


/**
 * @param {Object} post
 * @return {string} Plain title.
 */
function getPostTitle(post) {
  return (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_0__.decodeEntities)(post?.title?.rendered?.replace(/<[^>]+>/g, '') || '');
}

/**
 * @param {Object} post
 * @return {string} Plain excerpt.
 */
function getPostExcerpt(post) {
  return (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_0__.decodeEntities)(post?.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '');
}

/**
 * Collect embedded terms for the selected taxonomies.
 * Returns [] when the post has none — caller should skip rendering.
 *
 * @param {Object}   post
 * @param {Object}   options
 * @param {boolean}  options.showCategories
 * @param {boolean}  options.showTags
 * @param {number}   options.maxTerms
 * @param {number[]} [options.selectedTermIds] Empty = all mapped terms.
 * @return {Array<{ id: number, name: string, taxonomy: string }>}
 */
function getPostTerms(post, {
  showCategories = false,
  showTags = false,
  maxTerms = 3,
  selectedTermIds = []
} = {}) {
  if (!showCategories && !showTags) {
    return [];
  }
  const embedded = post?._embedded?.['wp:term'];
  if (!Array.isArray(embedded)) {
    return [];
  }
  const allowedTaxonomies = new Set();
  if (showCategories) {
    allowedTaxonomies.add('category');
  }
  if (showTags) {
    allowedTaxonomies.add('post_tag');
  }
  const allowlist = Array.isArray(selectedTermIds) && selectedTermIds.length > 0 ? new Set(selectedTermIds.map(Number)) : null;
  const counts = {
    category: 0,
    post_tag: 0
  };
  const terms = [];
  embedded.flat().forEach(term => {
    if (!term?.taxonomy || !allowedTaxonomies.has(term.taxonomy)) {
      return;
    }
    if (allowlist && !allowlist.has(Number(term.id))) {
      return;
    }
    if (maxTerms > 0 && counts[term.taxonomy] >= maxTerms) {
      return;
    }
    counts[term.taxonomy] += 1;
    terms.push({
      id: term.id,
      name: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_0__.decodeEntities)(term.name || ''),
      taxonomy: term.taxonomy
    });
  });
  return terms;
}

/***/ },

/***/ "./src/lab-post-cards/editor.scss"
/*!****************************************!*\
  !*** ./src/lab-post-cards/editor.scss ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/lab-post-cards/style.scss"
/*!***************************************!*\
  !*** ./src/lab-post-cards/style.scss ***!
  \***************************************/
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

/***/ "@wordpress/html-entities"
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
(module) {

module.exports = window["wp"]["htmlEntities"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/lab-post-cards/block.json"
/*!***************************************!*\
  !*** ./src/lab-post-cards/block.json ***!
  \***************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/lab-post-cards","version":"0.1.0","title":"Lab Post Cards","category":"widgets","icon":"admin-post","description":"Query posts by search, category, or tag and map them into Lab Card UI.","keywords":["posts","cards","query","category","tag","search","lab"],"attributes":{"columns":{"type":"number","default":3},"postsToShow":{"type":"number","default":6},"orderBy":{"type":"string","default":"date"},"order":{"type":"string","default":"desc"},"search":{"type":"string","default":""},"categoryId":{"type":"number","default":0},"tagId":{"type":"number","default":0},"selectedPostIds":{"type":"array","default":[]},"source":{"type":"string","default":"query"},"showCta":{"type":"boolean","default":true},"ctaText":{"type":"string","default":"Read more"},"showTerms":{"type":"boolean","default":false},"showCategories":{"type":"boolean","default":true},"showTags":{"type":"boolean","default":true},"maxTerms":{"type":"number","default":3},"selectedTermIds":{"type":"array","default":[]},"excerptLines":{"type":"number","default":3}},"supports":{"align":["wide","full"],"html":false},"textdomain":"gutenberg-lab","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

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
/******/ 			"lab-post-cards/index": 0,
/******/ 			"lab-post-cards/style-index": 0
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["lab-post-cards/style-index"], () => (__webpack_require__("./src/lab-post-cards/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map