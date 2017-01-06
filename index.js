/**
 * Author: hancong05@meituan.com
 * Date: 16/3/29
 */

'use strict';

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason.message, reason.stack || reason);
    process.exit(127)
});
abc;

process.on('uncaughtException', function (err) {
    console.error(err.message, err.stack)
    process.exit(127);
});

import clc from 'cli-color';
import packageJSON from './package.json';
import path from 'path';

var program = require('commander');
var providor;
var a;
var b;
var c;

if (process.env.CMIS_DEV_MODE) {
    providor = require('./es')
} else {
    providor = require('./src');
}



let {buil, watch, release, releaseTest, start, stop, exit, restart, list, createPage} = providor; 


let a = 3;

switch (process.argv[2]) {
    // case 'init':
    case 'build':
    case 'release':
    case 'release-test':
    case 'watch':
    case 'start':
    case 'restart':
    case 'stop':
    case 'list':
    case 'exit':
    case 'createpage':
    case '-v':
    case '--version':
    case '-h':
    case '--help':
        break;

    default:
        console.error(clc.red('error: 子命令不存在，请执行 cmis -h 获取帮助'));
        process.exit(127);
}

program
    .command('build')
    .description('执行项目编译')
    .action(function(){
        build();
    });

program
    .command('watch')
    .description('执行项目编译, 并监听文件改变')
    .action(function(){
        watch();
    });

program
    .command('release')
    .description('发布项目（生产环境）')
    .action(function(dist){
        if (arguments.length === 1) {
            dist = path.join(process.cwd(), 'dist');
        }

        dist = path.resolve(process.cwd(), dist);

        release(dist);
    });

program
    .command('release-test')
    .description('发布项目（测试环境）')
    .action(function(dist){
        if (arguments.length === 1) {
            dist = path.join(process.cwd(), 'dist');
        }

        dist = path.resolve(process.cwd(), dist);

        releaseTest(dist);
    });

program
    .command('start')
    .description('启动开发服务器')
    .action(function(){
        start();
    });

program
    .command('restart')
    .description('重启当前项目的开发服务器')
    .action(function(){
        restart();
    });

program
    .command('stop')
    .description('停止当前项目的开发服务器')
    .action(function(){
        stop();
    });

program
    .command('list')
    .description('列出当前正在运行的所有开发服务器')
    .action(function(){
        list();
    });

program
    .command('exit')
    .description('关闭所有的cmis开发服务器')
    .action(function(){
        exit();
    });

program
    .command('createpage [path]')
    .description('创建页面')
    .action(function(dist){
        if (!dist) {
            console.error(clc.red("error: 请指定需要创建的页面路径"));
            process.exit(127);
        }

        createPage(dist);
    });

program.version('cmis-env-spa, ' + packageJSON.version, '-v, --version');

program.usage('(Command | Option)');

program.parse(process.argv);
