package com.ssafy.backspring.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FileUploadResponse {
	private String fileName;
	private String fileDownloadUri;
	private String fileType;
	private long size;
}
