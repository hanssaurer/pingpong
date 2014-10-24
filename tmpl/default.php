<?php // no direct access
defined( '_JEXEC' ) or die( 'Restricted access' ); ?>
<?php 
echo ("ochsen");
$document = JFactory::getDocument();
 
$document->addScript(Juri::base() . 'modules/mod_pingpong/js/pingpong.js');

echo $playground;
echo ("Hans");
?>