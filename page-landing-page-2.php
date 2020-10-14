<?php

$context = Timber::context();
$context['posts'] = Timber::get_posts();
Timber::render('partials/single-landing-page-1.twig', $context);
