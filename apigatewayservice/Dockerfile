FROM maven:3.8-eclipse-temurin-19-alpine
COPY . /gateway
WORKDIR /gateway
ENTRYPOINT ["mvn", "spring-boot:run", "-Dmaven.repo.local=repository","-DskipTests"]