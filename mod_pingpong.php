<?php
/**
 * Ping Pong Game
 * 
 * @license        GNU/GPL, see LICENSE.php
 * mod_pingpong is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
 
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
// Include the syndicate functions only once
require_once( dirname(__FILE__).'/helper.php' );
 
$playgroundwidth = $params->get('playgroundwidth', '100'); 
$playgroundheight = $params->get('playgroundheight', '400'); 
//$playground = modPingPongHelper::getPlayground( $params );
$playground = modPingPongHelper::getPlayground( $playgroundwidth, $playgroundheight );
require( JModuleHelper::getLayoutPath( 'mod_pingpong' ) );
?>