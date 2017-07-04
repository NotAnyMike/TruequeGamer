const consoles = {
		xbox: 'xbox',
		ps: 'ps',
		both: 'both',
};

const Constants = {
	bogota: 'bogota',
	genericProfile: 'profile',
	consoles: consoles,
	messageNumber: 20,
	actionType: {
		changeFilterState: 'change_filter_status',
		changeSearchInput: 'change_search_input',
		searchButtonClicked: 'change_button_clicked',
		openCertainChat: 'open_certain_chat',
		sendMessage: 'send_message',
		chatOpen: 'chat_open',
		changeSearchChatValue: 'change_search_chat_value',
		goToDetails: 'go_to_details_page',
		goToProfile: 'go_to_profile_page',
	},
	eventType: {
		filterRefresh: 'filter_refresh',
		suggestionsRefresh: 'suggestions_refresh',
		search: 'search',
		chatsUpdated: 'chats_updated',
		messageAdded: 'message_added',
		userUpdated: 'user_update',
		resultsUpdated: 'results_updated',
		unreadMessageCountUpdated: 'unread_message_count_updated',
		goToDetails: 'go_to_details_page',
		goToProfile: 'go_to_profile',
		gamesAvailableUpdated: 'games_available_for_a_game_updated',
		availableGamesUpadate: 'available_games_update',
		profileUpdated: 'profile_updated',
	},
	filter: {
		not_used: 'not_used',
		used: 'used',
		exchange: 'exchange',
		to_sell: 'to_sell',
		xbox: consoles.xbox,
		ps: consoles.ps,
	},
	searchResults: {
		types: [consoles.ps, consoles.xbox, consoles.both],
	},
	header: {
		versions: {
			normal: 'normal',
			negative: 'negative',
		},
	},
	footer: {
		versions: {
			normal: 'normal',
			white: 'white',
			whiteBackground: 'white_background'
		}
	},
	routes: {
		index: '/',
		search: {
			ps: '/search/ps/',
			xbox: '/search/xbox/',
			both: '/search/ps-xbox/',
		},
		details: {
			ps: '/ps/',
			xbox: '/xbox/',
			both: '/ps-xbox/',
		},
		aboutUs: '/aboutus',
		api: {
			games: '/api/games/[console]/[used]/[exchange]/[name]/',
			publishDvd: '/api/game/',
			suggestions_igdb: '/api/game/suggestions/[console]/[string]/',
			delete_dvd: '/api/game/delete/[id_of_game]/',
		},
	}
};

module.exports = Constants;
