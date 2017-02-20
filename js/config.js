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

					$('textarea#description').trumbowyg( $.extend( opt , { autogrow: false } ) );

					$('#deletion_reason, #tags_default, #reviewer_message, #comment_form_content').trumbowyg( opt );

					$('body').on( 'click', 'textarea', function(){
						$(this).trumbowyg( opt );
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