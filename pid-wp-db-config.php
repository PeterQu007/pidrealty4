<?php

/**
 * @version [.200830] 
 * Copy Wordpress wp-config.php to wp-db-config.php 
 * To the theme's db folder
 * Delete All other settings except those for Database
 * @var locales for Cosmo
 */

// ** MySQL settings - You can get this info from your web host ** //

// locale strings Cosmo
$locales = [
  ['en_CA', 'America/Vancouver'],
  ['zh_CN', 'Asia/Shanghai'],
  ['zh_HK', 'Asia/Hong_Kong'],
  ['zh_TW', 'Asia/Taipei'],
  ['en_US', 'America/New_York'],
  ['en_AU', 'Australia/Sydney'],
  ['en_GB', 'Europe/London'],
  ['de_DE', 'Europe/Berlin'],
  ['fa_IR', 'Asia/Tehran'],
  ['hi_IN', 'Asia/Jayapura'],
  ['ar_EG', 'Africa/Cairo'],
];

/** *@var SET DB LOGIN CONSTANTS AND DEBUG CONSTANTS */
switch ($_SERVER['SERVER_NAME']) {
  case 'localhost': // CODING SERVER ON LOCAL WAMP64SERVER
    /** 
     * FOR localhost/pidrealty4 -> en-LOCALE
     * AND localhost/cn.pidhomes.ca -> zh-CN
     */

    /** The name of the database for WordPress */
    if (!defined('PID_DB_NAME')) {
      define('PID_DB_NAME', 'pidrealty4');
    }

    /** MySQL database username */
    if (!defined('PID_DB_USER')) {
      define('PID_DB_USER', 'root');
    }

    /** MySQL database password */
    if (!defined('PID_DB_PASSWORD')) {
      define('PID_DB_PASSWORD', '');
    }

    /** MySQL hostname */
    if (!defined('PID_DB_HOST')) {
      define('PID_DB_HOST', 'localhost');
    }
    /** @version [.200830] Change PID_DEBUG_LOCAL to PID_DEBUG_MODE  
     *  @var RUN DEBUG MODE ON LOCAL SERVER
     */

    if (!defined('PID_DEBUG_MODE')) {
      define('PID_DEBUG_MODE', true);
    }

    /** @version [.200830] Add For Google Tracking Code Loading Condition
     * @var INHIBIT GOOGLE TRACKING ON LOCAL SERVER
     */
    if (!defined('PID_RUN_GOOGLE_TRACKING')) {
      define('PID_RUN_GOOGLE_TRACKING', false);
    }

    break;
  case 'pidhomes.ca': // LIVE SERVER FOR en-LOCALE
  case 'cn.pidhomes.ca': // LIVE SERVER FOR zh-CN
    /**
     * FOR LIVE / TESTING WEBSITES AS ABOVE LISTINGS
     * USE SOME PID TABLES / VIEWS / FROM DATABASE pqu007_wrdp1
     */

    /** The name of the database for WordPress */
    if (!defined('PID_DB_NAME')) {
      define('PID_DB_NAME', 'pqu007_wrdp1');
    }

    /** MySQL database username */
    if (!defined('PID_DB_USER')) {
      define('PID_DB_USER', 'pqu007_wrdp1');
    }

    /** MySQL database password */
    if (!defined('PID_DB_PASSWORD')) {
      define('PID_DB_PASSWORD', 'TjaOiLR85FdBvM');
    }

    /** MySQL hostname */
    if (!defined('PID_DB_HOST')) {
      define('PID_DB_HOST', 'localhost');
    }

    /** INHIBIT DEBUG MODE ON REMOTE LIVE SITES */
    if (!defined('PID_DEBUG_MODE')) {
      define('PID_DEBUG_MODE', false);
    }

    /** RUN GOOGLE TAG AND TRACKING ON REMOTE LIVE SITES */
    if (!defined('PID_RUN_GOOGLE_TRACKING')) {
      define('PID_RUN_GOOGLE_TRACKING', true);
    }
    break;

  case 'pidhome.ca': // TESTING SERVER FOR en-LOCALE
  case 'cn.pidhome.ca': // TESTING SERVER FOR zh-CN
    /**
     * FOR LIVE / TESTING WEBSITES AS ABOVE LISTINGS
     * USE SOME PID TABLES / VIEWS / FROM DATABASE pqu007_wrdp1
     */

    /** The name of the database for WordPress */
    if (!defined('PID_DB_NAME')) {
      define('PID_DB_NAME', 'pqu007_wrdp1');
    }

    /** MySQL database username */
    if (!defined('PID_DB_USER')) {
      define(
        'PID_DB_USER',
        'pqu007_wrdp1'
      );
    }

    /** MySQL database password */
    if (!defined('PID_DB_PASSWORD')) {
      define('PID_DB_PASSWORD', 'TjaOiLR85FdBvM');
    }

    /** MySQL hostname */
    if (!defined('PID_DB_HOST')) {
      define('PID_DB_HOST', 'localhost');
    }

    /** RUN DEBUG MODE ON REMOTE TESTING SITES */
    if (!defined('PID_DEBUG_MODE')) {
      define('PID_DEBUG_MODE', true);
    }

    /** INHIBIT GOOGLE TAG AND TRACKING ON REMOTE SITES */
    if (!defined('PID_RUN_GOOGLE_TRACKING')) {
      define('PID_RUN_GOOGLE_TRACKING', false);
    }
    break;
}

/**
 * @since [.200905]
 * @var GOOGLE_TAG_MANAGER
 */
switch ($_SERVER['SERVER_NAME']) {
  case 'localhost':
    /** *@var TEST_GOOGLE_TAG */
    if (!defined('PID_GOOGLE_TAG_ID')) {
      define('PID_GOOGLE_TAG_ID', 'GTM-N8WKJ6P');
    }
    break;
  case 'pidhomes.ca':
    if (!defined('PID_GOOGLE_TAG_ID')) {
      define('PID_GOOGLE_TAG_ID', 'GTM-5S5T7QS');
    }
    break;
  case 'cn.pidhomes.ca':
    if (!defined('PID_GOOGLE_TAG_ID')) {
      define('PID_GOOGLE_TAG_ID', 'GTM-N8WKJ6P');
    }
    break;
}
