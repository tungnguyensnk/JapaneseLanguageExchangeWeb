FROM maven:3.8-eclipse-temurin-19-alpine
COPY . /gateway
WORKDIR /gateway
RUN mvn clean package -Dmaven.repo.local=repository
CMD ["java", "-jar", "target/APIGateway-0.0.1-SNAPSHOT.jar"]