<?php
/**
 * Plugin Name:       Infinite Moving Cards
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       infinite-moving-cards
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	function () {
		register_block_type( __DIR__ . '/build' );
	}
);
