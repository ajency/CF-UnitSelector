<?php

namespace CommonFloor\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel {

    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        'CommonFloor\Console\Commands\Inspire',
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule( Schedule $schedule ) {
        // $schedule->command( 'inspire' )
        //         ->hourly();
        $schedule->call(function () {
                    updateBlockedUnitsToAvailable();
                    $myfile = fopen("/var/www/html/newtest.txt", "w") or die("Unable to open file!");
                        })->cron('* * * * *');
    }

}