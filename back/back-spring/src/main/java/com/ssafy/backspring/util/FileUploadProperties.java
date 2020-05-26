package com.ssafy.backspring.util;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@ConfigurationProperties(prefix="file") //application.properties 에 선언한 file 필드에 접근
@Data
public class FileUploadProperties {
	private static class LazyHolderForFileProp {
		private static final FileUploadProperties INSTANCE = new FileUploadProperties();
	}
	public static FileUploadProperties getInstance() {
		return LazyHolderForFileProp.INSTANCE;
	}
	private String uploadDir;
}
