syntax = 'sass'




var gulp          = require('gulp'),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require("gulp-notify"),
	gcmq          = require('gulp-group-css-media-queries'),
	uncss         = require('gulp-uncss');
	smartgrid     = require('smart-grid');


var settings = {
    outputStyle: syntax, /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px',  
        fields: '0' /* side fields */
    },
    breakPoints: {
        xl: {
            width: '1140px', /* -> @media (max-width: 1100px) */
        },
        lg: {
            width: '960px'
        },
        md: {
            width: '720px',
        },
        sm: {
            width: '540px'
        }
    }
};


gulp.task('smartgrid', function () {
	 smartgrid('app/'+syntax, settings);
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});
gulp.task(syntax, function() {
	return gulp.src('app/'+syntax+'/main.'+syntax)
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(gulp.dest('app/libs/css'))
	.pipe(browserSync.reload({ stream: true }));
	// .pipe(browserSync.stream());
});

gulp.task('group',[syntax], function () {
    gulp.src('app/libs/css/*.css')
    	// .pipe(uncss({
     //        html: ['app/index.html']
     //    }))
        .pipe(gcmq())
  		.pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) 
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function() {
	return gulp.src([
		// 'app/libs/js/jquery/*.*',//1
		'app/libs/js/vue/*.*',//1
		'app/libs/js/plagins/*.*',//2
		'app/libs/js/main/*.*',//3
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js 
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }));
});
// 'smartgrid'
gulp.task('watch', ['group','smartgrid', 'js', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/*.*', [syntax]);
	gulp.watch(['app/libs/js/**/*.*'], ['js']);
	gulp.watch(['app/libs/css/*.*'], ['group']);
	gulp.watch('app/*.html', browserSync.reload);
});
gulp.task('default', ['watch']);