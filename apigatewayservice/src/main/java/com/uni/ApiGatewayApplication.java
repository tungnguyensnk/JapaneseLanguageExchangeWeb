package com.uni;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

     @Bean
        public RouteLocator customRouteLocator(RouteLocatorBuilder builder, AuthFilter authFilter) {
            return builder.
                    routes()
                    .route("test", r -> r.path("/test")
//                             .filters(f -> f.filter(authFilter.apply(new AuthFilter.Config())))
                            .uri("http://httpbin.org"))
                    .route("User Service", r -> r.path("/user/**")
                            .filters(f -> f.rewritePath("/user/(?<path>.*)", "/api/${path}"))
                            .uri("http://nginx"))
                    .route("Post Service", r -> r.path("/post/**")
                            .filters(f -> f.rewritePath("/post/(?<path>.*)", "/${path}"))
                            .uri("http://postService"))
                    .route("Comment Service", r -> r.path("/comment/**")
                            .filters(f -> f.rewritePath("/comment/(?<path>.*)", "/${path}"))
                            .uri("http://commentService"))
                    .route("BookMark Service", r -> r.path("/bookmark/**")
                            .filters(f -> f.rewritePath("/bookmark/(?<path>.*)", "/${path}"))
                            .uri("http://bookmarkService"))
                    .route("Notification Service", r -> r.path("/notification/**")
                            .filters(f -> f.rewritePath("/notification/(?<path>.*)", "/${path}"))
                            .uri("http://notificationService"))
                    .build();
        }
}
