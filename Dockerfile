FROM java:8

LABEL maintainer="chonkk@hotmail.com"

VOLUME /tmp

EXPOSE 8080

ARG JAR_FILE=build/libs/Application-0.0.1.jar

ADD ${JAR_FILE} board.jar

ENTRYPOINT ["java","-jar","/board.jar"]