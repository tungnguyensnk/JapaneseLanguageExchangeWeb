package com.uni.monitor;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Collections;
import java.util.Set;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.*;

@Component
public class LoggingFilter implements GlobalFilter {

    private static final Log log = LogFactory.getLog(LoggingFilter.class);

    private static final Set<String> EXCLUDED_HEADERS = Collections.singleton("authorization");

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        Route route = exchange.getAttribute(GATEWAY_ROUTE_ATTR);
        URI uri = exchange.getAttribute(GATEWAY_REQUEST_URL_ATTR);
//        // log request headers
//        exchange.getRequest().getHeaders().forEach((name, values) -> {
//            if (!EXCLUDED_HEADERS.contains(name.toLowerCase())) {
//                values.forEach(value -> log.info("LoggingFilter Request Header: " + name + "=" + value));
//            }
//        });
//        // log response headers
//        exchange.getResponse().getHeaders().forEach((name, values) -> {
//            values.forEach(value -> log.info("LoggingFilter Response Header: " + name + "=" + value));
//        });
//        // log request params
//        exchange.getRequest().getQueryParams().forEach((name, values) -> {
//            values.forEach(value -> log.info("LoggingFilter Request Param: " + name + "=" + value));
//        });
//
//        // log request body
//        exchange.getRequest().getBody().subscribe(dataBuffer -> {
//            byte[] bytes = new byte[dataBuffer.readableByteCount()];
//            dataBuffer.read(bytes);
//            log.info("LoggingFilter Request Body: " + new String(bytes));
//        });
        log.info("LoggingFilter: " + route + " " + uri);
        return chain.filter(exchange);
    }
}