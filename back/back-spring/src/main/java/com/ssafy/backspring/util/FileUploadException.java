package com.ssafy.backspring.util;

public class FileUploadException extends RuntimeException {
	private static final long serialVersionUID = -3327253028806240874L;
	public FileUploadException(String msg) {
		super(msg);
	}
	public FileUploadException(String msg, Throwable cause) {
		super(msg,cause);
	}
}
