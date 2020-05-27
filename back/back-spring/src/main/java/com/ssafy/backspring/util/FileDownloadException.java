package com.ssafy.backspring.util;

public class FileDownloadException extends RuntimeException {
	private static final long serialVersionUID = -3327253028806240874L;
	public FileDownloadException(String msg) {
		super(msg);
	}
	public FileDownloadException(String msg, Throwable cause) {
		super(msg,cause);
	}
}
