<?php
/**
 * Helper Class for Ping Pong Game
 * 
 * @license        GNU/GPL, see LICENSE.php
 * mod_pingpong is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
class modPingPongHelper
{
    /**
     * Retrieves the playground HTML
     *
     * @param array $params An object containing the module parameters
     * @access public
     */    
    //public static function getPlayground( $params )
    public static function getPlayground( $playgroundwidth, $playgroundheight )
    {
        return '<div id="playground" style="width:' . $playgroundwidth . '%; height:'. $playgroundheight . 'px;"><canvas id="canvas" ></canvas></div>';
    }
/**
//Obtain a database connection
$db = JFactory::getDbo();
//Retrieve the shout
$query = $db->getQuery(true)
            ->select($db->quoteName('hello'))
            ->from($db->quoteName('#__helloworld'))
            ->where('lang = '. $db->Quote('en-GB'));
//Prepare the query
$db->setQuery($query);
// Load the row.
$result = $db->loadResult();
//Return the Hello
return $result;	
**/
}
?>
