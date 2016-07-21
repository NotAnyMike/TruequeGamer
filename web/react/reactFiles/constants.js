const Constants = {
	bogota: 'bogota',
	actionType: {
		changeFilterState: 'change_filter_status',
		changeSearchInput: 'change_search_input',
		searchButtonClicked: 'change_button_clicked',
		openCertainChat: 'open_certain_chat',
		sendMessage: 'send_message',
	},
	eventType: {
		suggestionsRefresh: 'suggestions_refresh',
		search: 'search',
		messageAdded: 'message_added',
	},
	filter: {
		not_used: 'not_used',
		used: 'used',
		exchange: 'exchange',
		to_sell: 'to_sell',
		xbox: 'xbox',
		ps: 'ps'
	}
};

module.exports = Constants;
