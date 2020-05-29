FROM maven:3.3-jdk-8
VOLUME /tmp
COPY . .
RUN ls -al
RUN pwd
RUN mvn package
COPY . .
RUN ls -al
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/target/back-spring-0.0.1-SNAPSHOT.jar"]
