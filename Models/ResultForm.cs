namespace market.sencard.com.tr.Models
{
    public class ResultForm
    {
        public string MerchantPaymentId { get; set; }
        public string ApiMerchantId { get; set; }
        public string PaymentSystem { get; set; }
        public string PaymentSystemType { get; set; }
        public string PaymentSystemEftCode { get; set; }
        public string PgTranId { get; set; }
        public string PgTranDate { get; set; }
        public string PgTranRefId { get; set; }
        public string PgOrderId { get; set; }
        public string CustomerId { get; set; }
        public string SessionToken { get; set; }
        public string CardToken { get; set; }
        public string Random { get; set; }
        public string SdSha512 { get; set; }
        public string SD_SHA512 { get; set; }
        public string PgTranErrorText { get; set; }
        public string PgTranErrorCode { get; set; }
        public string ErrorCode { get; set; }
        public string ErrorMsg { get; set; }
        public string ResponseCode { get; set; }
        public string ResponseMsg { get; set; }
    }
}