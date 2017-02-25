;(function( $ ) {

	"use strict";

	/*
	-------------------------------------------------------------------------------
	EnvatoEditor jQuery Plugin
	-------------------------------------------------------------------------------
	*/
	$.fn.EnvatoEditor = function( options ) {

		if (this.length > 1){
			this.each(function() {
				$(this).EnvatoEditor(options);
			});
			return this;
		}

		/* Default settings
		------------------------*/
		var settings = $.extend({
		}, options );

		/* Global plugin vars
		--------------------------*/
		var plugin = this;

		/* Plugin go!
		------------------*/
		var init = function() {
			plugin.build();
		}

		/* Build structure
		-----------------------*/
		this.build = function() {

			var self    = false;
			
			var EE = {

				prepare: function(){
					var opt = {
						resetCss: true,
						autogrow: true,
						svgPath: chrome.extension.getURL('/trumbowyg/ui/icons.svg'),
						btns: [
							['customFormatting', 'bold', 'em', 'link' ],
							'btnGrp-lists',
							['insertImage', 'removeformat'],
							[ 'viewHTML', 'fullscreen' ]
						],
						btnsDef: {
							customFormatting: {
								dropdown: ['p', 'h2', 'h3', 'h4', 'blockquote', 'preformatted'],
								ico: 'p'
							}
						},
						plugins: {
							templates: [
								{
									name: 'Template 1',
									html: '<p>I am a template!</p>'
								},
								{
									name: 'Template 2',
									html: '<p>I am a different template!</p>'
								}
							]
						}
					};
					// On comments page.
					$('#comment_form_content, .js-comment-new-reply-field').trumbowyg( opt );

					// Other textareas, show editor on click.
					$('body').on( 'click', 'textarea', function(){
						$(this).trumbowyg( opt );
					});

					// On submittion page.
					var descr_opt = opt;
					$('textarea#description').trumbowyg( $.extend( descr_opt , { autogrow: false } ) );
					$('#deletion_reason, #tags_default, #reviewer_message').trumbowyg( opt );

					$('textarea').on( 'change', function(){
						if ($.trim($('#textarea').val()).length < 1){
							var tbw =  $(this).parents('.trumbowyg-box');
							tbw.find('.trumbowyg-editor');

							tbw.trumbowyg('html', '');
						}
					});
				},

				multiselect: function(){
  					var m = $('select[multiple]');
  					$.each( m, function(){
  						var t = $(this);
  						t.css( 'height', t.children().length * 1.26 + 'em' );
  					});
				},

				/*
				-------------------------------------------------------------------------------
				Construct plugin
				-------------------------------------------------------------------------------
				*/
				__construct: function(){
					self = this;

					self.prepare();
					self.multiselect();

					return this;
				}

			};

			/*
			-------------------------------------------------------------------------------
			Rock it!
			-------------------------------------------------------------------------------
			*/
			EE.__construct();

		}

		//Plugin go!
		init();
		return this;

	};

	$( document ).ready( function(){
		$( 'body' ).EnvatoEditor();
	} );

})(jQuery);