FROM java:8

LABEL maintainer="chonkk@hotmail.com"

VOLUME /tmp

EXPOSE 8080

ARG JAR_FILE=build/libs/gradle-springboot-mysql-thymeleaf-sb-admin-2-0.0.1.war

ADD ${JAR_FILE} board.jar

ENTRYPOINT ["java","-jar","/board.jar"]