package com.shop.product.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;

import com.shop.vo.ProductVO;

public interface ProductMapper {
	//메인화면
	List<ProductVO> productList(); //인기목록
	List<ProductVO> productNewList(); //최근등록
	List<ProductVO> categoryList(int topCategory);
	List<ProductVO> productMdList();
	List<ProductVO> productCheapList();
	
	//상품상세
	List<ProductVO> productInfo(int prodNo);
	
	
	
}
