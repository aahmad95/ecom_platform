const pdp_pids = ['pdp/revamp', 'pdp', 'pdp/fashion'];
const cart_pids = ['cart'];
const address_pids = ['shipping_add_address', 'shipping_address_book', 'shipping_edit_address', 'locationtree_change', 'pick_up_from_list', 'billing_address_book', 'billing_add_address', 'billing_edit_address', 'locationtree_change'];
const shipping_pids = ['shipping'];
const wishlist_pids = ['my_wishlist', 'wishlist'];
const trade_pids = ['transaction_result'];
const order_pids = ['order_list', 'order_details', 'logistic_details', 'reverse-result', 'order-tracking', 'transaction_result_new'];
const review_pids = ['evaluation_my_review', 'myreviewhistory', 'writefollowupreview', 'writemyreview', 'm_reportreview', 'myreviews', 'writereview', 'followup', 'reportreview', 'submitsuccess', 'PDPratingandReview', '14470363', 'PDPQandA']
const payment_pids = ['14024080', '14147851', '14208908', '14208898', '14208879', '14208886', '14208913', '14208917', '14208840', '14208865', 'payment_page', 'payment-management']
const reverse_pids = ['create-return-pk'];
const new_wallet_pids = ['27713655', '27713087', '27713081', '27712318', '27711467', '27710316', '27709487', '27709436'];
const flashsale_pids = ['11796723'];
const search_pids = ['searchlist', 'search'];
const wallet_pids = ['mywallet_new'];
const homepage_pids = ['home'];
const growth_pids = [];
const member_pids = ['member_myaccount'];
//! 11817115: info-change
const trade_member = ['account-info', 'verify-page', '11817115'];

function getAesPid(spmbOrPathname) {

  //! pdp
  if (pdp_pids.includes(spmbOrPathname)) {
    return { pid: 'pdp', page_id: spmbOrPathname };
  }
  if (/^\/products\//.test(spmbOrPathname)) {
    return { pid: 'pdp', page_id: 'pdp/revamp' };
  }

  //! cart
  if (cart_pids.includes(spmbOrPathname)) {
    return { pid: 'cart', page_id: spmbOrPathname };
  }

  //! trade member
  if (trade_member.includes(spmbOrPathname)) {
    return { pid: 'daraz-member', page_id: spmbOrPathname }
  }

  //! address
  if (address_pids.includes(spmbOrPathname)) {
    return { pid: 'daraz_address', page_id: spmbOrPathname };
  }

  //! shipping
  if (shipping_pids.includes(spmbOrPathname)) {
    return { pid: 'shipping', page_id: spmbOrPathname };
  }

   //! wishlist
   if (wishlist_pids.includes(spmbOrPathname)) {
    return { pid: 'wishlist', page_id: spmbOrPathname };
  }
  
  //! order
  if (order_pids.includes(spmbOrPathname)) {
    return { pid: 'order', page_id: spmbOrPathname };
  }

  //! trade
  if (trade_pids.includes(spmbOrPathname)) {
    return { pid: 'trade', page_id: spmbOrPathname };
  }
  //! payment
  if (payment_pids.includes(spmbOrPathname)) {
    return { pid: 'payment', page_id: spmbOrPathname };
  }

  //! review
  if (review_pids.includes(spmbOrPathname)) {
    return { pid: 'review', page_id: spmbOrPathname };
  }
  //! reverse
  if (reverse_pids.includes(spmbOrPathname)) {
    return { pid: 'reverse', page_id: spmbOrPathname };
  }
  //! wallet
  if (wallet_pids.includes(spmbOrPathname)) {
    return { pid: 'wallet', page_id: spmbOrPathname };
  }
  //! new wallet
  if (new_wallet_pids.includes(spmbOrPathname)) {
    return { pid: 'new_wallet', page_id: spmbOrPathname };
  }
  //! homepage
  if (homepage_pids.includes(spmbOrPathname)) {
    return { pid: 'daraz_homepage', page_id: spmbOrPathname };
  }
  //! growth
  if (growth_pids.includes(spmbOrPathname)) {
    return { pid: '', page_id: spmbOrPathname };
  }
  //! flashsale
  if (flashsale_pids.includes(spmbOrPathname)) {
    return { pid: 'flashsale', page_id: spmbOrPathname };
  }
  //! member
  if (member_pids.includes(spmbOrPathname)) {
    return { pid: 'member', page_id: spmbOrPathname };
  }
  //! search
  if (search_pids.includes(spmbOrPathname)) {
    return { pid: 'search', page_id: spmbOrPathname };
  }
  //! campaign
  if (/^tm\d+$/.test(spmbOrPathname)) {
    return { pid: 'gcp_campaign_page', page_id: spmbOrPathname };
  }
  return { pid: 'daraz_others', page_id: spmbOrPathname };
}

window.getAesPid = getAesPid