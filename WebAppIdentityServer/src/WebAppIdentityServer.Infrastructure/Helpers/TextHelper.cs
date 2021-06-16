using System;
using System.Text;
using System.Text.RegularExpressions;

namespace WebAppIdentityServer.Utilities.Helpers
{
    public static class TextHelper
    {
        public static string ToUnsignString(this string input)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = input.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }

        public static string ToString(decimal number)
        {
            string s = number.ToString("#");
            string[] numberWords = new string[] { "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín" };
            string[] layer = new string[] { "", "nghìn", "triệu", "tỷ" };
            int i, j, unit, dozen, hundred;
            string str = " ";
            bool booAm = false;
            decimal decS = 0;
            //Tung addnew
            try
            {
                decS = Convert.ToDecimal(s.ToString());
            }
            catch
            {
            }
            if (decS < 0)
            {
                decS = -decS;
                s = decS.ToString();
                booAm = true;
            }
            i = s.Length;
            if (i == 0)
            {
                str = numberWords[0] + str;
            }
            else
            {
                j = 0;
                while (i > 0)
                {
                    unit = Convert.ToInt32(s.Substring(i - 1, 1));
                    i--;
                    if (i > 0)
                    {
                        dozen = Convert.ToInt32(s.Substring(i - 1, 1));
                    }
                    else
                    {
                        dozen = -1;
                    }

                    i--;
                    if (i > 0)
                    {
                        hundred = Convert.ToInt32(s.Substring(i - 1, 1));
                    }
                    else
                    {
                        hundred = -1;
                    }

                    i--;
                    if ((unit > 0) || (dozen > 0) || (hundred > 0) || (j == 3))
                    {
                        str = layer[j] + str;
                    }

                    j++;
                    if (j > 3)
                    {
                        j = 1;
                    }

                    if ((unit == 1) && (dozen > 1))
                    {
                        str = "một " + str;
                    }
                    else
                    {
                        if ((unit == 5) && (dozen > 0))
                        {
                            str = "năm " + str;
                        }
                        else if (unit > 0)
                        {
                            str = numberWords[unit] + " " + str;
                        }
                    }
                    if (dozen < 0)
                    {
                        break;
                    }
                    else
                    {
                        if ((dozen == 0) && (unit > 0))
                        {
                            str = "lẻ " + str;
                        }

                        if (dozen == 1)
                        {
                            str = "mười " + str;
                        }

                        if (dozen > 1)
                        {
                            str = numberWords[dozen] + " mươi " + str;
                        }
                    }
                    if (hundred < 0)
                    {
                        break;
                    }
                    else
                    {
                        if ((hundred > 0) || (dozen > 0) || (unit > 0))
                        {
                            str = numberWords[hundred] + " trăm " + str;
                        }
                    }
                    str = " " + str;
                }
            }
            if (booAm)
            {
                str = "Âm " + str;
            }

            return str + "đồng chẵn";
        }
    }
}
