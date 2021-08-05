using market.sencard.com.tr.Models;

namespace market.sencard.com.tr.State
{
    public class StateObject
    {
        public int ProposalId { get; set; }
        public int PlanId { get; set; }
        public ResultForm ResultForm { get; set; }
        public string CreditCardNumber { get; set; }
        public string CreditCardHolder { get; set; }
        public string CreditCardExpMonth { get; set; }
        public string CreditCardExpYear { get; set; }
        public decimal TotalAmount { get; set; }
        public int MainPolicyId { get; set; }
        public string SessionToken { get; set; }
        public string Token { get; set; }
    }
}